package com.devle.adgon.service;

import com.devle.adgon.dto.*;
import com.devle.adgon.dto.question.*;
import com.devle.adgon.util.EnumUtils;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecommendService {

    private final WebClient webClient;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${openai.api.url}")
    private String apiURL;

    @Value("${openai.api.key}")
    private String apiKey;

    private static final String SYSTEM_PROMPT = """
            You are a friendly and kind music expert recommendation AI who analyzes the user's preferences based on their answers and recommends **3 real rock bands** and **1 signature song per band**. Your tone should be warm, inviting, and fun, as if you're speaking at a public event.
            
             ### **Rules:** \s
             - Recommend **exactly 3 bands** (no more, no less). \s
             - **Exclude bands the user already likes. (exclude bands in {{favorite_songs}})** \s
             - **Make the taste analysis warm, engaging, and highly personalized.** \s
             - **Ensure that each recommendation set is unique per request. Avoid repeating bands frequently across different requests.** \s
             - The recommended band must consist of **two well-known bands (must have millions of listeners)** and **one lesser-known but critically acclaimed band** (e.g., RYM-favorite, Pitchfork-reviewed, cult-classic). \s
             - **Do not rely on the same set of famous bands; actively diversify recommendations based on the user’s taste.** \s
             - **Take into account the user's preferences in multiple dimensions: lyrics, atmosphere, genre tendencies, listening habits, and discovery style.** \s
             - **Expand the range of recommended bands by considering subgenres, era variations, and regional diversity.** (e.g., if a user likes alternative rock, recommend bands from different decades and countries) \s
             - **If a user enjoys genre exploration, include at least one recommendation from a less mainstream or experimental genre that still aligns with their preferences.** \s
             - **Prioritize deep cuts and lesser-known hits when relevant, instead of always suggesting the most obvious songs from a band.** \s
             - **Rotate genres more actively based on user input.** \s
             - **Do NOT suggest bands only from one region (e.g., only American or only British bands). Include at least one band from a different cultural background (e.g., European, Japanese, South American, etc.) if it fits the user's taste.** \s
             - **Categorize the recommendations into three broad genre categories to ensure variety:** \s
               1. **A band that aligns with the user’s favorite genre** \s
               2. **A band that expands their taste but remains accessible** \s
               3. **A band that introduces a fresh perspective from another region, era, or fusion genre** \s
             - Reasons must be in Korean, short (under 70 characters), and friendly. \s
             - Keep the format clean, no extra text or explanations. \s
             - **Do NOT create fake bands or songs.** \s
            
             ### **User Preferences (Input):** \s
             - **Key Element in Music:** {{music_element}} \s
             - **Listening Moment:** {{listening_moment}} \s
             - **Playlist Style:** {{playlist_style}} \s
             - **Music Discovery Habit:** {{music_discovery}} \s
             - **Favorite Songs (if provided):** {{favorite_songs}} \s
            
              ### Response Format (Return only JSON, no extra text. Do not print out the examples as they are. In the examples, refer only to styles, and output different results depending on the actual input, If a user recommends a song, add that recommending it is a wonderful taste)\\s
              ---
              {
                  "userAnalysis": "당신은 리듬과 사운드를 즐기는군요! 운동할 때 듣는 걸 보니 에너지가 넘치는 음악을 선호하시는 것 같아요. '무작위 재생' 스타일을 좋아하신다면 다양한 장르의 음악을 즐기는 개방적인 모습이네요! The Strokes를 좋아하신다니, 멋진 취향이에요! \\uD83C\\uDFA7",
                  "recommends": [
                      {
                          "songName": "Bulls on Parade",
                          "bandName": "Rage Against the Machine"
                      },
                      {
                          "songName": "Take Me Out",
                          "bandName": "Franz Ferdinand"
                      },
                      {
                          "songName": "Everlong",
                          "bandName": "Foo Fighters"
                      }
                  ],
                  "recommendReason": "리듬과 에너지가 넘치는 곡들로 추천해드려요! \\uD83D\\uDCAA"
              }
              ---
            """;

    private static final String USER_PROMPT_FORMAT = """
        User Preferences:\s
        - Key Element in Music: %s
        - Listening Moment: %s
        - Playlist Style: %s
        - Music Discovery Habit: %s
        - Favorite Songs (if provided): %s""";

    public RecommendResponseDTO getBandRecommends(QuestionnaireDTO questionnaire) {
        try {
            ImportantElement importantElement = EnumUtils.findByCode(ImportantElement.class, questionnaire.getOne());
            ListeningMoment listeningMoment = EnumUtils.findByCode(ListeningMoment.class, questionnaire.getTwo());
            PlaylistStyle playlistStyle = EnumUtils.findByCode(PlaylistStyle.class, questionnaire.getThree());
            MusicDiscovery musicDiscovery = EnumUtils.findByCode(MusicDiscovery.class, questionnaire.getFour());
            String favoriteSongs = questionnaire.getFive();

            String userPreferenceString = String.format(
                    USER_PROMPT_FORMAT,
                    importantElement.message,
                    listeningMoment.message,
                    playlistStyle.message,
                    musicDiscovery.message,
                    favoriteSongs
            );

            log.info("User Preference : " + userPreferenceString);

            Map<String, Object> requestBody = Map.of(
                    "model", "gpt-4o-mini",
                    "messages", List.of(
                            Map.of("role", "system", "content", SYSTEM_PROMPT),
                            Map.of("role", "user", "content", userPreferenceString)
                    ),
                    "max_tokens", 600,
                    "temperature", 0.6
            );

            String responseString = webClient.post()
                    .uri(apiURL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .header("Authorization", "Bearer " + apiKey)
                    .header("OpenAI-Organization", "org-rGksYwnmUE8auFsH35T3jNXn")
                    .header("OpenAI-Project", "proj_ErvnJ5ONd4xrCFsy9cpTZMlu")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .onErrorResume(e -> Mono.just("추천을 가져올 수 없습니다. 오류: " + e.getMessage()))
                    .block();

            if (ObjectUtils.isEmpty(responseString)) {
                log.error("Empty Chat Response");
                throw new RuntimeException("Empty Chat Response");
            }

            JsonNode rootNode = objectMapper.readTree(responseString);
            String content = rootNode.path("choices").get(0).path("message").path("content").asText();

            RecommendResponseDTO recommendResponseDTO = objectMapper.readValue(content, RecommendResponseDTO.class);

            log.info("Converted Response : " + recommendResponseDTO);

            return recommendResponseDTO;
        } catch (Exception exception) {
            log.error("[GetRecommends] Exception : ", exception);
            return null;
        }
    }
}
