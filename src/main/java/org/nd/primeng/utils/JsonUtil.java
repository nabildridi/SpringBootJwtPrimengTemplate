package org.nd.primeng.utils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtil {

	private static ObjectMapper mapper = new ObjectMapper();

	public static Optional<String> getString(String payload, String path) {

		JsonNode node = null;

		try {
			node = mapper.readTree(payload.getBytes(StandardCharsets.UTF_8));
			path = "/" + path.replaceAll("\\.", "/");
			String value = node.at(path).asText();
			return Optional.of(value);

		} catch (Exception e) {
			return Optional.empty();
		}
	}

	public static Optional<String> getString(JsonNode payload, String path) {

		try {
			path = "/" + path.replaceAll("\\.", "/");
			String value = payload.at(path).asText();
			return Optional.of(value);

		} catch (Exception e) {
			return Optional.empty();
		}
	}

	public static Optional<JsonNode> getObject(String payload, String path) {

		JsonNode node = null;

		try {
			node = mapper.readTree(payload.getBytes(StandardCharsets.UTF_8));
			path = "/" + path.replaceAll("\\.", "/");
			return Optional.of(node.at(path));
		} catch (IOException e) {
			return Optional.empty();
		}
	}

	public static List<String> toStringArray(JsonNode array) {

		try {
			TypeReference<List<String>> typeReference = new TypeReference<>() {
			};
			return mapper.readValue(array.toPrettyString(), typeReference);

		} catch (IOException e) {
			return null;
		}
	}

	public static String prettyPrintObject(Object object) {

		try {
			String prettyJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(object);
			return prettyJson;

		} catch (IOException e) {
			return null;
		}
	}

	public static String compact(String payload) {

		JsonNode node = null;

		try {
			node = mapper.readTree(payload.getBytes(StandardCharsets.UTF_8));
			return node.toString();
		} catch (IOException e) {
			return "";
		}
	}

}
