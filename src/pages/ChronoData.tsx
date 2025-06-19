
import React from 'react';
import PageLayout from '@/components/PageLayout';
import ChronoDataTable from '@/components/ChronoDataTable';
import { Button } from "@/components/ui/button";
import { Download, Upload } from 'lucide-react';

const ChronoData: React.FC = () => {
  const actionButtons = (
    <div className="flex gap-2">
      <Button variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Exporter PDF
      </Button>
      <Button variant="outline" size="sm">
        <Upload className="h-4 w-4 mr-2" />
        Uploader session
      </Button>
    </div>
  );

  return (
    <PageLayout title="Données Chronotachygraphe" actions={actionButtons}>
      <ChronoDataTable />
    </PageLayout>
  );
};

export default ChronoData;
