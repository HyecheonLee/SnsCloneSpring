package com.hyecheon.web.service

import com.hyecheon.domain.entity.user.AuthToken
import com.hyecheon.domain.entity.user.UserRepository
import com.hyecheon.web.dto.file.FileReqDto
import com.hyecheon.web.dto.user.UserRespDto
import com.hyecheon.web.dto.web.NotifyDto
import com.hyecheon.web.exception.IdNotExistsException
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.ApplicationEventPublisher
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.util.Base64Utils
import java.nio.file.Files
import java.nio.file.Paths
import java.util.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/19
 */
@Transactional
@Service
class FileService(
	private val userRepository: UserRepository,
	private val applicationEventPublisher: ApplicationEventPublisher,
) {
	private val log = LoggerFactory.getLogger(this::class.java)

	@Value("\${app.filePrePath}")
	private lateinit var filePrePath: String

	fun saveNewProfile(fileReq: FileReqDto.NewProfile) = run {
		val authToken = AuthToken.getLoggedToken()
		val user =
			userRepository.findById(authToken.userId!!).orElseThrow { IdNotExistsException("${authToken.userId}") }
		val userFilename = createUserFilename(fileReq.extension)
		writeFile(userFilename, base64ToBinary(fileReq.base64))
		user.profilePic = userFilename
	}

	private fun writeFile(filename: String, binary: ByteArray) {
		val file = Paths.get("${filePrePath}/$filename")
		if (!Files.exists(file.parent)) {
			Files.createDirectories(file.parent)
		}
		Files.write(file, binary)
		log.info("write file complete : $file")
	}

	fun createUserFilename(extension: String? = null) = run {
		val authToken = AuthToken.getLoggedToken()
		if (extension == null) "/${authToken.userId}/${UUID.randomUUID()}"
		else "/${authToken.userId}/${UUID.randomUUID()}.${extension}"
	}

	fun base64ToBinary(bas64: String) = run {
		Base64Utils.decodeFromString(bas64)
	}
}