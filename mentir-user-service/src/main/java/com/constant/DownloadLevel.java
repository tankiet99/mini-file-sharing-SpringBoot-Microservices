package com.constant;

public enum DownloadLevel {
    BRONZE(50L),
    SILVER(70L),
    GOLD(1000L);

    private final Long levelData;

    private DownloadLevel(Long levelData) {
        this.levelData = levelData;
    }

    public Long getLevelData() {
        return levelData*MeasurementUnits.MB_TO_BYTE.getPayload();
    }
}
