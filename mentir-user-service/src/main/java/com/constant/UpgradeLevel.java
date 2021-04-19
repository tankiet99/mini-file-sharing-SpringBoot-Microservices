package com.constant;

public enum UpgradeLevel {
    BRONZE(20L),
    SILVER(50L),
    GOLD(100L);

    private final Long levelData;

    private UpgradeLevel(Long levelData) {
        this.levelData = levelData;
    }

    public Long getLevelData() {
        return levelData*MeasurementUnits.MB_TO_BYTE.getPayload();
    }
}
