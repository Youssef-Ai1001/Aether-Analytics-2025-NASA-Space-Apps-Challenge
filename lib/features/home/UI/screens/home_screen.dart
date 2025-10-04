import 'package:flutter/material.dart';
import 'package:nasa_app/features/home/UI/screens/widget/action%20section%20widgets/action_section.dart';
import 'package:nasa_app/features/home/UI/screens/widget/air%20quality%20section%20widgets/air_quality_section.dart';
import 'package:nasa_app/features/home/UI/screens/widget/current%20pollutants%20section%20widgets/current_pollutants_section.dart';
import 'package:nasa_app/features/home/UI/screens/widget/today%20is%20advice%20section%20widgets/today_is_advice_section.dart';
import 'package:nasa_app/features/home/UI/screens/widget/weather%20conditions%20section%20widgets/weather_conditions_section.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        top: false,
        child: CustomScrollView(
          slivers: [
            const SliverToBoxAdapter(child: AirQualitySection()),
            const SliverToBoxAdapter(child: SizedBox(height: 10)),
            SliverPadding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              sliver: SliverList(
                delegate: SliverChildListDelegate([
                  const CurrentPollutantsSection(),
                  const SizedBox(height: 16),
                  const WeatherConditionsSection(),
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
}
