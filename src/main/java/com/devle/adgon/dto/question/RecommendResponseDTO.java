package com.devle.adgon.dto.question;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class RecommendResponseDTO {

    private String userAnalysis;

    private List<BandRecommend> recommends;

    private String recommendReason;

    @Getter
    @ToString
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BandRecommend {

        private String songName;

        private String bandName;
    }
}
