package com.devle.adgon.dto.question;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ListeningMoment implements Questions {

    STUDYING(1, "While studying or focusing – Boosting concentration!"),
    EXERCISING(2, "While exercising or walking – Motivation through rhythm!"),
    COMMUTING(3, "While commuting – Getting through the daily ride..."),
    BEFORE_SLEEPING(4, "Before sleeping – Relaxing and unwinding time.");

    public final int code;

    public final String message;

}
