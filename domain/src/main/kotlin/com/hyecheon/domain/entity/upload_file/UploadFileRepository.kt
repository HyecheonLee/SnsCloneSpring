package com.hyecheon.domain.entity.upload_file

import org.springframework.data.jpa.repository.JpaRepository

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/19
 */
interface UploadFileRepository : JpaRepository<UploadFile, Long> {

	fun findByTypeAndCreatedByOrderByIdDesc(type: FileType, username: String): List<UploadFile>

}