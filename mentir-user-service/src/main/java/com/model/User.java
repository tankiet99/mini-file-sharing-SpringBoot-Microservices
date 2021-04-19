package com.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Document
public class User {

    @Id
    private String id;
    @Indexed(unique = true)
    private String username;
    private String password;
    private String fullName;
    private Level level = Level.BRONZE;
    private Integer isBlock = 0;
    private List<Role> roles = Arrays.asList(Role.ROLE_CLIENT);
    private Date resetDate = new Date();
    private long dailyDownloadingQuota = 0;
    private long totalUploadedFileSize = 0;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Level getLevel() {
        return level;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public Integer getIsBlock() {
        return isBlock;
    }

    public void setIsBlock(Integer isBlock) {
        this.isBlock = isBlock;
    }

    public Long getDailyDownloadingQuota() {
        return dailyDownloadingQuota;
    }

    public void setDailyDownloadingQuota(Long dailyDownloadingQuota) {
        this.dailyDownloadingQuota = dailyDownloadingQuota;
    }

    public Long getTotalUploadedFileSize() {
        return totalUploadedFileSize;
    }

    public void setTotalUploadedFileSize(Long totalUploadedFileSize) {
        this.totalUploadedFileSize = totalUploadedFileSize;
    }

    public Date getResetDate() {
        return resetDate;
    }

    public void setResetDate(Date resetDate) {
        this.resetDate = resetDate;
    }

    public Integer getBlock() {
        return isBlock;
    }

    public void setBlock(Integer block) {
        isBlock = block;
    }
}
