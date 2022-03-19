package com.hyecheon.web.dto.file

import com.hyecheon.domain.entity.upload_file.FileType
import javax.persistence.EnumType
import javax.persistence.Enumerated

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/19
 */
object FileRespDto {
	data class Model(
		var path: String? = null,
		@Enumerated(EnumType.STRING)
		var type: FileType? = null,
		var isShow: Boolean = false,
		var createdBy: String? = null,
		var createdAt: String? = null,
	)
}