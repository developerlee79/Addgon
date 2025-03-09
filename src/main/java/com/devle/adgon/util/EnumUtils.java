package com.devle.adgon.util;

import com.devle.adgon.dto.question.Questions;

public class EnumUtils {

    public static <T extends Enum<T> & Questions> T findByCode(Class<T> enumClass, int code) {
        for (T element : enumClass.getEnumConstants()) {
            if (element.getCode() == code) {
                return element;
            }
        }
        return null;
    }
}
