import 'package:dio/dio.dart';

class ApiService {
  final Dio dio;
  final String baseUrl = "https://07d8adfbe3e1.ngrok-free.app/api";

  ApiService()
    : dio = Dio(
        BaseOptions(
          connectTimeout: const Duration(seconds: 35), // زيادة وقت الاتصال
          receiveTimeout: const Duration(seconds: 35), // زيادة وقت الاستجابة
          headers: {'Content-Type': 'application/json'},
          validateStatus: (_) => true,
        ),
      );

  // GET request
  Future<dynamic> get({
    required String endPoint,
    Map<String, dynamic>? queryParameters,
  }) async {
    try {
      final response = await dio.get(
        "$baseUrl$endPoint",
        queryParameters: queryParameters,
      );
      return response.data;
    } catch (e) {
      throw Exception('GET request failed: $e');
    }
  }

  // POST request
  Future<dynamic> post({
    required String endPoint,
    required Map<String, dynamic> data,
  }) async {
    try {
      final response = await dio.post("$baseUrl$endPoint", data: data);
      return response;
    } catch (e) {
      throw Exception('POST request failed: $e');
    }
  }

  // PUT request
  Future<dynamic> put({
    required String endPoint,
    required Map<String, dynamic> data,
  }) async {
    try {
      final response = await dio.put("$baseUrl$endPoint", data: data);
      return response;
    } catch (e) {
      throw Exception('PUT request failed: $e');
    }
  }

  // DELETE request
  Future<dynamic> delete({
    required String endPoint,
    Map<String, dynamic>? data,
  }) async {
    try {
      final response = await dio.delete("$baseUrl$endPoint", data: data);
      return response;
    } catch (e) {
      throw Exception('DELETE request failed: $e');
    }
  }
}
