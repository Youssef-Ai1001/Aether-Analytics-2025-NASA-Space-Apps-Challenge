import '../../data/models/dashboard_model.dart';

class DashboardState {}

class DashboardInitial extends DashboardState {}

class DashboardLoading extends DashboardState {}

class DashboardSuccess extends DashboardState {
  final DashboardModel dashboardData;

  DashboardSuccess({required this.dashboardData});
}

class DashboardFailure extends DashboardState {
  final String error;

  DashboardFailure({required this.error});
}
