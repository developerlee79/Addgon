package com.devle.adgon.dto.question;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PlaylistStyle implements Questions {

    EXPLORE_NEW(1, "I love exploring completely new genres!"),
    DEEP_DIVE(2, "I prefer diving deep into familiar genres."),
    MIXED(3, "A mix – I enjoy both familiar and new music."),
    JUST_RECOMMEND(4, "I don’t care – I just like getting recommendations.");

    public final int code;

    public final String message;
}
