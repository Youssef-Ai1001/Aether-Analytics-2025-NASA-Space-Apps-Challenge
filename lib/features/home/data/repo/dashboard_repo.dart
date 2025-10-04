import 'package:dartz/dartz.dart';
import '../models/dashboard_model.dart';

abstract class DashboardRepo {
  Future<Either<String, DashboardModel>> gatDataDashboard();
}
