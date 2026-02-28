import { Dimensions, Text, View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AppCard from '../common/AppCard';
import theme from '../../constants/theme';
import climateTrends from '../../data/climateTrends';
import useClimate from '../../hooks/useClimate';

const screenWidth = Dimensions.get('window').width - 48;

export default function TemperatureChart() {
  const { trends, loading } = useClimate();
  if (loading || !trends) return null;
  return (
    <AppCard>
      <Text style={styles.title}>Temperature Trend (°C)</Text>

      {/* Legend */}
      <View style={styles.legendRow}>
        <View style={[styles.legendDot, { backgroundColor: theme.colors.secondary }]} />
        <Text style={styles.legendText}>Temperature</Text>
      </View>

      <LineChart
        data={{
          labels: trends.labels,
          datasets: [
            {
              data: trends.temperature,
              color: () => theme.colors.secondary,
              strokeWidth: 3,
            },
          ],
        }}
        width={screenWidth}
        height={220}
        yAxisSuffix="°"
        fromZero={true}
        segments={5}                
        withInnerLines={true}               // horizontal grid
        withOuterLines={false}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: () => theme.colors.secondary,
          labelColor: () => theme.colors.textSecondary,
          style: {
            borderRadius: 12,
          },
          propsForDots: {
            r: '5',
            strokeWidth: '2',
            stroke: theme.colors.secondary,
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
    color: theme.colors.secondary,
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
