package com.hyecheon.web.api

import com.hyecheon.web.api.Constant.FILE_V1_API
import com.hyecheon.web.dto.file.FileReqDto
import com.hyecheon.web.dto.web.ResponseDto
import com.hyecheon.web.service.FileService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

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
	fun profileUpload(@RequestBody profile: FileReqDto.NewProfile) = run {
		fileService.saveNewProfile(profile)
		ResponseDto(data = "")
	}
}