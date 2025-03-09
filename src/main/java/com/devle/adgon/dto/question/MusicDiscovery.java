package com.devle.adgon.dto.question;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MusicDiscovery implements Questions {

    CATEGORIZED(1, "Carefully categorized – 'This is for commuting, this is for chilling...'"),
    SHUFFLE_ALL(2, "Throw everything in and shuffle – 'I just play whatever comes on!'"),
    CREATIVE_NAMES(3, "I take time naming my playlists – 'Every playlist name must be special!'"),
    NO_PLAYLISTS(4, "I don’t make playlists – 'Too much work! I just listen.'");

    public final int code;

    public final String message;
}
