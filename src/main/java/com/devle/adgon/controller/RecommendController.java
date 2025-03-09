package com.devle.adgon.controller;

import com.devle.adgon.dto.QuestionnaireDTO;
import com.devle.adgon.service.RecommendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/recommend")
@RequiredArgsConstructor
public class RecommendController {

    private final RecommendService recommendService;

    @PostMapping
    public ResponseEntity<?> getMusicRecommend(
            @RequestBody QuestionnaireDTO questionnaire
    ) {
        if (ObjectUtils.isEmpty(questionnaire)) {
            return ResponseEntity
                    .badRequest()
                    .body("Emtpy Questionnaire");
        }

        if (ObjectUtils.isEmpty(questionnaire.getOne())) {
            return ResponseEntity
                    .badRequest()
                    .body("Emtpy Question 1");
        } else if (ObjectUtils.isEmpty(questionnaire.getTwo())) {
            return ResponseEntity
                    .badRequest()
                    .body("Emtpy Question 2");
        } else if (ObjectUtils.isEmpty(questionnaire.getThree())) {
            return ResponseEntity
                    .badRequest()
                    .body("Emtpy Question 3");
        } else if (ObjectUtils.isEmpty(questionnaire.getFour())) {
            return ResponseEntity
                    .badRequest()
                    .body("Emtpy Question 4");
        }

        return ResponseEntity
                .ok()
                .body(recommendService.getBandRecommends(questionnaire));
    }
}
