package com.hyecheon.web.dto.file

import com.hyecheon.domain.entity.upload_file.FileType

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/19
 */

object FileReqDto {
	data class NewProfile(val imageFile: String) {
		val extension: String
		val base64: String

		init {
			val split = imageFile.split(",")
			extension = split[0].removePrefix("data:image/").removeSuffix(";base64")
			base64 = split[1]
		}
	}

	data class NewFile(
		val imageFile: String,
		var fileType: FileType? = null,
	) {
		val extension: String
		val base64: String

		init {
			val split = imageFile.split(",")
			extension = split[0].removePrefix("data:image/").removeSuffix(";base64")
			base64 = split[1]
		}
	}
}