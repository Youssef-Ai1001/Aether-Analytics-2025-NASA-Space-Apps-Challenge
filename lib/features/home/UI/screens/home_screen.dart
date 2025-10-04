import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nasa_app/core/utils/app_colors.dart';
import 'package:nasa_app/features/home/UI/screens/widget/action%20section%20widgets/action_section.dart';
import 'package:nasa_app/features/home/UI/screens/widget/air%20quality%20section%20widgets/air_quality_section.dart';
import 'package:nasa_app/features/home/UI/screens/widget/current%20pollutants%20section%20widgets/current_pollutants_section.dart';
import 'package:nasa_app/features/home/UI/screens/widget/today%20is%20advice%20section%20widgets/today_is_advice_section.dart';
import 'package:nasa_app/features/home/UI/screens/widget/weather%20conditions%20section%20widgets/weather_conditions_section.dart';
import 'package:nasa_app/features/home/data/repo/dashboard_repo_impl.dart';
import '../../../../core/network/api_service.dart';
import '../manager/dashboard_cubit.dart';
import '../manager/dashboard_state.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late DashboardCubit dashboardCubit;

  @override
  void initState() {
    super.initState();

    final apiService = ApiService(); // هنا بتنشئ ApiService
    dashboardCubit = DashboardCubit(DashboardRepoImpl(apiService: apiService));
    dashboardCubit.getDashboardData(); // جلب الداتا أول ما الشاشة تفتح
  }

  @override
  void dispose() {
    dashboardCubit.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<DashboardCubit, DashboardState>(
      builder: (context, state) {
        if (state is DashboardLoading) {
          return Center(
            child: CircularProgressIndicator(color: AppColors.primaryColor),
          );
        } else if (state is DashboardFailure) {
          return Center(child: Text("Error: ${state.error}"));
        } else if (state is DashboardSuccess) {
          final data = state.dashboardData;

          return Scaffold(
            body: SafeArea(
              top: false,
              child: CustomScrollView(
                slivers: [
                  SliverToBoxAdapter(
                    child: AirQualitySection(aqi: data.aqi, pm25: data.pm25),
                  ),
                  const SliverToBoxAdapter(child: SizedBox(height: 10)),
                  SliverPadding(
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                    sliver: SliverList(
                      delegate: SliverChildListDelegate([
                        CurrentPollutantsSection(dashboard: data),
                        const SizedBox(height: 16),
                        WeatherConditionsSection(dashboard: data),
                        const SizedBox(height: 16),
                        const ActionSection(),
                        const SizedBox(height: 16),
                        const TodayIsAdviceSection(),
                        const SizedBox(height: 16),
                      ]),
                    ),
                  ),
                ],
              ),
            ),
          );
        }

        return const SizedBox.shrink();
      },
    );
  }
}
