package com.utils;

import com.constant.DownloadLevel;
import com.constant.UpgradeLevel;
import com.model.Level;
import com.model.User;

import java.util.Calendar;
import java.util.Date;

import static com.model.Level.*;

public class UserUtils {
    public static Level returnNextLevel(Level currentLevel) {
        switch (currentLevel) {
            case BRONZE :
                return SILVER;
            case SILVER :
                return GOLD;
            case GOLD :
                return GOLD;
            default:
                return BRONZE;
        }
    }

    public static Level returnPreviousLevel(Level currentLevel) {
        if (currentLevel == GOLD) {
            return SILVER;
        }
        return BRONZE;
    }

    public static Long getTotalUploadedFileCorrespondLevel(Level level) {
        switch (level) {
            case BRONZE :
                return UpgradeLevel.BRONZE.getLevelData();
            case SILVER :
                return UpgradeLevel.SILVER.getLevelData();
            case GOLD :
                return UpgradeLevel.GOLD.getLevelData();
            default:
                return UpgradeLevel.BRONZE.getLevelData();
        }
    }

    public static Long getDailyDownloadingQuota(Level level) {
        switch (level) {
            case BRONZE :
                return DownloadLevel.BRONZE.getLevelData();
            case SILVER :
                return DownloadLevel.SILVER.getLevelData();
            case GOLD :
                return DownloadLevel.GOLD.getLevelData();
            default:
                return DownloadLevel.BRONZE.getLevelData();
        }
    }
}
