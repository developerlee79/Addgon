package com.devle.adgon.dto.question;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ImportantElement implements Questions {

    LYRICS(1, "Lyrics – The message in the lyrics matters the most."),

    ATMOSPHERE(2, "Atmosphere – The overall mood and emotion are key!"),

    INSTRUMENTALS(3, "Instrumentals – I enjoy the details of the sound and playing."),

    VOCALS(4, "Vocals – The voice and singing style are crucial!");

    public final int code;

    public final String message;

}
