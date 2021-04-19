package com.constant;

public enum MeasurementUnits {
    MB_TO_BYTE(1000000L);

    private final Long payload;

    private MeasurementUnits(Long payload) {
        this.payload = payload;
    }

    public Long getPayload() {
        return payload;
    }
}
