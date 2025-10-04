import 'package:dartz/dartz.dart';
import 'package:flutter/cupertino.dart';
import 'package:nasa_app/core/network/api_service.dart';
import 'package:nasa_app/features/auth/data/repo/auth_repo.dart';

class AuthRepoImpl implements AuthRepo {
  final ApiService apiService;

  AuthRepoImpl({required this.apiService});

  @override
  Future<Either<String, int>> auth({required String email}) async {
    try {
      // نجرب login أول
      final loginResponse = await apiService.post(
        endPoint: "/auth/register/login",
        data: {"email": email},
      );

      debugPrint("❌❌${loginResponse.statusCode.toString()}");
      // لو login نجح نرجع status code
      if (loginResponse.statusCode != null && loginResponse.statusCode! < 400) {
        return Right(loginResponse.statusCode!);
      }

      // لو login فشل أو المستخدم مش موجود نعمل signup
      final signUpResponse = await apiService.post(
        endPoint: "/auth/register/request-otp",
        data: {"email": email},
      );
      debugPrint("❌❌${signUpResponse.statusCode.toString()}");
      return Right(signUpResponse.statusCode ?? 0);
    } catch (error) {
      debugPrint("❌❌${error.toString()}");
      return Left(error.toString());
    }
  }

  @override
  Future<Either<String, int>> checkOtp({
    required String otp,
    required String email,
  }) async {
    try {
      final response = await apiService.post(
        endPoint: "/auth/register/verify-otp",
        data: {"otp": otp, "email": email},
      );
      return Right(response.statusCode ?? 0);
    } catch (error) {
      return Left(error.toString());
    }
  }
}
