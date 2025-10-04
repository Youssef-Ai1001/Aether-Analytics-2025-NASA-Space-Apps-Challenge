import 'package:flutter_bloc/flutter_bloc.dart';
import '../../data/repo/dashboard_repo.dart';
import 'dashboard_state.dart';

class DashboardCubit extends Cubit<DashboardState> {
  final DashboardRepo dashboardRepo;

  DashboardCubit(this.dashboardRepo) : super(DashboardInitial());

  Future<void> getDashboardData() async {
    emit(DashboardLoading());

    final result = await dashboardRepo.gatDataDashboard();

    result.fold(
      (failure) => emit(DashboardFailure(error: failure)),
      (dashboard) => emit(DashboardSuccess(dashboardData: dashboard)),
    );
  }
}
