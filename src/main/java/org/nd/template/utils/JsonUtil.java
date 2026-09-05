package org.nd.template.utils;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.node.ObjectNode;
import tools.jackson.databind.util.JSONWrappedObject;
import tools.jackson.databind.util.RawValue;

import static java.util.Map.entry;

public class JsonUtil {

	private static ObjectMapper mapper = new ObjectMapper();

	public static Optional<String> getString(String payload, String path) {

		JsonNode node = null;

		try {
			node = mapper.readTree(payload.getBytes(StandardCharsets.UTF_8));
			path = "/" + path.replaceAll("\\.", "/");
			String value = node.at(path).asString();
			return Optional.of(value);

		} catch (Exception e) {
			return Optional.empty();
		}
	}

	public static Optional<String> getString(JsonNode payload, String path) {

		try {
			path = "/" + path.replaceAll("\\.", "/");
			String value = payload.at(path).asString();
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
		} catch (Exception e) {
			return Optional.empty();
		}
	}

	public static List<String> toStringArray(JsonNode array) {

		try {
			TypeReference<List<String>> typeReference = new TypeReference<>() {
			};
			return mapper.readValue(array.toPrettyString(), typeReference);

		} catch (Exception e) {
			return null;
		}
	}

	public static String prettyPrintObject(Object object) {

		try {
			String prettyJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(object);
			return prettyJson;

		} catch (Exception e) {
			return null;
		}
	}

	public static String compact(String payload) {

		JsonNode node = null;

		try {
			node = mapper.readTree(payload.getBytes(StandardCharsets.UTF_8));
			return node.toString();
		} catch (Exception e) {
			return "";
		}
	}
	
	public static ObjectNode getResponse(Object ...params) {
		
		
		ObjectNode response = mapper.createObjectNode();
		
		
		
		for (int i = 0; i < params.length - 1; i += 2) {
		    String key = (String) params[i];
		    Object value = params[i + 1];
		    
		    switch (value) {
	        case String s  -> response.put(key, s);
	        case Integer x -> response.put(key, x);  
	        case Boolean b -> response.put(key, b);
	        case Double d -> response.put(key, d);
	        case Float f -> response.put(key, f);
	        case Long l -> response.put(key, l);
	        case null      -> response.putNull(key);                      
	        default        -> response.putPOJO(key, value);
	    };
	    
		    
		}
		
		return response;
	}

}
