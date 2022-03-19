package com.hyecheon.web.api

import com.hyecheon.domain.entity.upload_file.FileType
import com.hyecheon.web.api.Constant.FILE_V1_API
import com.hyecheon.web.dto.file.FileReqDto
import com.hyecheon.web.dto.web.ResponseDto
import com.hyecheon.web.service.FileService
import org.springframework.web.bind.annotation.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/19
 */
@RestController
@RequestMapping(FILE_V1_API)
class FileApi(
	private val fileService: FileService,
) {
	@PostMapping("/profile")
	fun profileUpload(@RequestBody profile: FileReqDto.NewFile) = run {
		fileService.saveNewProfile(profile)
		ResponseDto(data = "")
	}

	@PostMapping("/images")
	fun userUploadFile(@RequestBody file: FileReqDto.NewFile) = run {
		fileService.saveNewFile(file)
		ResponseDto(data = "")
	}

	@GetMapping("/{type}")
	fun getFilePath(@PathVariable type: FileType) = run {
		val files = fileService.getByType(type)
		ResponseDto(data = files)
	}
}