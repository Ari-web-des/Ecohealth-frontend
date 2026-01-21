import { Dimensions, Text, View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AppCard from '../common/AppCard';
import theme from '../../constants/theme';
import climateTrends from '../../data/climateTrends';

// react-native-chart-kit does not support tap tooltips.

const screenWidth = Dimensions.get('window').width - 48;

export default function AQIChart() {
  return (
    <AppCard>
      <Text style={styles.title}>AQI Trend</Text>

      {/* Legend */}
      <View style={styles.legendRow}>
        <View style={[styles.legendDot, { backgroundColor: theme.colors.warning }]} />
        <Text style={styles.legendText}>AQI Index</Text>
      </View>

      <LineChart
        data={{
          labels: climateTrends.labels,
          datasets: [
            {
              data: climateTrends.aqi,
              color: () => theme.colors.warning,
              strokeWidth: 3,
            },
          ],
        }}
        width={screenWidth}
        height={220}
        fromZero={true}
        segments={6}                  
        withInnerLines={true}
        withOuterLines={false}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: () => theme.colors.warning,
          labelColor: () => theme.colors.textSecondary,
          style: {
            borderRadius: 12,
          },
          propsForDots: {
            r: '5',
            strokeWidth: '2',
            stroke: theme.colors.warning,
          },
          propsForBackgroundLines: {
            strokeDasharray: '4',
            stroke: theme.colors.border,
          },
        }}
        bezier={true}

        style={styles.chart}
      />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
    color: theme.colors.warning,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.textSecondary,
  },
  chart: {
    borderRadius: 12,
  },
});
