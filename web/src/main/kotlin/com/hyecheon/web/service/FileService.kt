package com.hyecheon.web.service

import com.hyecheon.domain.entity.upload_file.FileType
import com.hyecheon.domain.entity.upload_file.UploadFile
import com.hyecheon.domain.entity.upload_file.UploadFileRepository
import com.hyecheon.domain.entity.user.AuthToken
import com.hyecheon.domain.entity.user.UserRepository
import com.hyecheon.web.dto.file.FileReqDto
import com.hyecheon.web.exception.IdNotExistsException
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
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
	private val uploadFileRepository: UploadFileRepository,
) {
	private val log = LoggerFactory.getLogger(this::class.java)

	@Value("\${app.filePrePath}")
	private lateinit var filePrePath: String

	fun saveNewProfile(fileReq: FileReqDto.NewFile) = run {
		val authToken = AuthToken.getLoggedToken()
		val user =
			userRepository.findById(authToken.userId!!).orElseThrow { IdNotExistsException("${authToken.userId}") }

		val userFilename = getUserFilename("profile.${fileReq.extension}")
		//프로파일은 1개만 저장 안에 있는 파일은 삭제한다.
		Files.deleteIfExists(Paths.get(userFilename))

		writeFile(userFilename, base64ToBinary(fileReq.base64))
		user.profilePic = userFilename
	}

	private fun writeFile(filename: String, binary: ByteArray): Long {
		val file = Paths.get("${filePrePath}/$filename")
		if (!Files.exists(file.parent)) {
			Files.createDirectories(file.parent)
		}
		Files.write(file, binary)
		log.info("write file complete : $file")
		return Files.size(file)
	}

	fun getUserFilename(filename: String) = run {
		val authToken = AuthToken.getLoggedToken()
		"/${authToken.userId}/${filename}"
	}

	fun createUserFilename(prefix: String = "", extension: String? = null) = run {
		val authToken = AuthToken.getLoggedToken()
		if (extension == null) "/${authToken.userId}/${UUID.randomUUID()}"
		else "/${authToken.userId}/${prefix}/${UUID.randomUUID()}.${extension}"
	}

	fun base64ToBinary(bas64: String) = run {
		Base64Utils.decodeFromString(bas64)
	}

	fun saveNewFile(file: FileReqDto.NewFile) {
		val authToken = AuthToken.getLoggedToken()
		val userFilename = createUserFilename(file.fileType?.name ?: "", file.extension)
		val fileSize = writeFile(userFilename, base64ToBinary(file.base64))

		uploadFileRepository.save(UploadFile(userFilename,
			file.extension,
			fileSize,
			file.fileType,
			createdBy = authToken.username!!,
			isShow = true)
		)

	}

	fun getByType(type: FileType) = run {
		val (_, username, _) = AuthToken.getLoggedToken()
		uploadFileRepository.findByTypeAndCreatedByOrderByIdDesc(type, username!!)
	}
}