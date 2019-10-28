import React, { useState } from 'react';
import { isEqual } from 'lodash-es';
import { Icon, Card, Select, Form, Button } from 'antd';

interface FiltersProps {
  availableCampaigns: string[];
  availableDatasources: string[];
  pickCampaigns: (campaigns: string[]) => void;
  pickDatasources: (datasources: string[]) => void;
  pickedCampaigns: string[];
  pickedDatasources: string[];
}

export const Filters: React.FC<FiltersProps> = ({
  availableCampaigns,
  availableDatasources,
  pickCampaigns,
  pickDatasources,
  pickedCampaigns,
  pickedDatasources
}) => {
  const [unAppliedDatasources, setUnAppliedDatasources] = useState<string[]>(
    []
  );
  const [unAppliedCampaigns, setUnAppliedCampaigns] = useState<string[]>([]);
  const { Option } = Select;
  const { Item } = Form;

  const commitFilters = () => {
    pickCampaigns(unAppliedCampaigns);
    pickDatasources(unAppliedDatasources);
  };

  return (
    <Card
      title={
        <>
          <Icon type='sliders' style={{ marginRight: '10px' }} />
          Filter dimension values
        </>
      }
      style={{ margin: '10px 0' }}
    >
      <Item label='Datasource'>
        <Select
          mode='multiple'
          style={{ width: '100%' }}
          placeholder='All datasources'
          onChange={(datasources: string[]) =>
            setUnAppliedDatasources(datasources)
          }
        >
          {availableDatasources.map(item => (
            <Option key={item}>{item}</Option>
          ))}
        </Select>
      </Item>

      {/* TODO: this select picker is slow when thousands of options are available */}
      <Item label='Campaign'>
        <Select
          mode='multiple'
          style={{ width: '100%' }}
          placeholder='All campaigns'
          onChange={(campaigns: string[]) => setUnAppliedCampaigns(campaigns)}
        >
          {availableCampaigns.map(item => (
            <Option key={item}>{item}</Option>
          ))}
        </Select>
      </Item>

      <Button
        type='primary'
        onClick={commitFilters}
        disabled={
          isEqual(unAppliedDatasources, pickedDatasources) &&
          isEqual(unAppliedCampaigns, pickedCampaigns)
        }
      >
        Apply
      </Button>
    </Card>
  );
};
