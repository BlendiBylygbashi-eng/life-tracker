import { Line } from 'react-chartjs-2';
import { commonOptions } from '../utils/chartConfig';
import type { ChartDataset } from '../utils/chartDatasets';

interface BaseChartProps {
  title: string;
  data: ChartDataset;
  yAxisConfig: {
    max?: number;
    title: string;
  };
}

export function BaseChart({ title, data, yAxisConfig }: BaseChartProps) {
  return (
    <div className="aspect-[16/9] w-full max-h-[400px]">
      <div className="h-full">
        <h3 className="text-sm font-medium mb-2">{title}</h3>
        <div className="h-[calc(100%-2rem)]">
          <Line 
            options={{
              ...commonOptions,
              scales: {
                ...commonOptions.scales,
                y: {
                  ...commonOptions.scales.y,
                  ...yAxisConfig,
                  title: {
                    display: true,
                    text: yAxisConfig.title,
                    padding: { top: 10, bottom: 10 }
                  }
                }
              }
            }} 
            data={data} 
          />
        </div>
      </div>
    </div>
  );
}
