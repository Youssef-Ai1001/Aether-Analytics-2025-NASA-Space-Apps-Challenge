import 'package:dartz/dartz.dart';
import 'package:nasa_app/core/network/api_service.dart';
import 'package:nasa_app/features/home/data/models/dashboard_model.dart';
import 'package:nasa_app/features/home/data/repo/dashboard_repo.dart';

class DashboardRepoImpl implements DashboardRepo {
  final ApiService apiService;

  DashboardRepoImpl({required this.apiService});

  @override
  Future<Either<String, DashboardModel>> gatDataDashboard() async {
    try {
      final response = await apiService.get(
        endPoint: "/dashboard/data?stateCode=NY",
      );
      final data = DashboardModel.fromJson(response.data);
      return Right(data);
    } catch (error) {
      return Left(error.toString());
    }
  }
}
