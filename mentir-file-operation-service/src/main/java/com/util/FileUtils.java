package com.util;

import com.model.Category;
import com.model.File;

import java.util.List;
import java.util.stream.Collectors;

public class FileUtils {
    public static Category convertCategoryToEnum(String category) {
        switch (category) {
            case "AUDIO":
                return Category.AUDIO;
            case "COMPRESSED":
                return Category.COMPRESSED;
            case "VIDEO":
                return Category.VIDEO;
            case "DATA":
                return Category.DATA;
            case "IMAGE":
                return Category.IMAGE;
            case "OTHER":
                return Category.OTHER;
            default:
                return null;
        }
    }

    public static String generatePath(List<String> folders) {
        return folders.stream()
                .map(folder -> folder)
                .collect(Collectors.joining("/"));
    }

    public static String convertToRegex(String name) {
        return "/" + name + "/";
    }

    public static Long convertMegabyteToByte(Integer megabyte) {
        return megabyte*1000000L;
    }
}
