import { Button, Tooltip } from '@blueprintjs/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { OpenLogsDirectory } from '../../../wailsjs/go/app/App';
import { AppToaster } from '../../common/toaster';

export function ExportLogsButton() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  return (
    <Tooltip content={t('exportLogsButton.tooltip') as string}>
      <Button
        loading={loading}
        onClick={async () => {
          setLoading(true);
          try {
            await OpenLogsDirectory();
          } catch (err) {
            AppToaster.show({
              message: t('exportLogsButton.openError', { error: err }),
              intent: 'danger',
            });
          } finally {
            setLoading(false);
          }
        }}
        className="export-logs__button"
      >
        {t('exportLogsButton.label')}
      </Button>
    </Tooltip>
  );
}
