import React from 'react';
import { Heading, CircularProgress, CircularProgressLabel, Box } from '@chakra-ui/core';

import { OnePagerData } from '../model/model';
import { ContentCard } from './ContentCard';

type OnePagerFinancesProps = {
  onePagerData: OnePagerData;
  isLoading: boolean;
};

/** Renders the Finances card. */
export const OnePagerFinances = ({
  onePagerData,
  isLoading,
}: OnePagerFinancesProps) => {
  // Format a number to include a dollar sign. This function
  // will be improved as part of task 2.
  const formatFinanceNumber = (financeNumber: number) => {
    return "$" + Number(financeNumber).toLocaleString();
  };

  // Draw a circle with progress bar representing
  // percentage of funding goal achieved
  const fundingProgressCircle = (onePagerData) => {
    let percentageRaised = Math.round(
      100 * (onePagerData.fundsRaisedInStage / onePagerData.fundraisingStageGoal))
    return (
      <CircularProgress value={percentageRaised} size="200px" textAlign="right" padding="0px">
        <CircularProgressLabel>
          {percentageRaised}%
        </CircularProgressLabel>
      </CircularProgress>
    );
  }

  return (
    <ContentCard title='Finances' isLoading={isLoading}>
      <Heading as='h1' size='lg' marginRight='10px'>
        Funding Stage: {onePagerData.fundraisingStage}
      </Heading>
      <SubHeading>
        Funds Raised: {formatFinanceNumber(onePagerData.fundsRaisedInStage)}
      </SubHeading>
      <SubHeading>
        Funding Goal: {formatFinanceNumber(onePagerData.fundraisingStageGoal)}
      </SubHeading>
      <SubHeading>
        Funding Details: {onePagerData.fundraisingDetails}
      </SubHeading>
      
      <Box textAlign="center">
        {fundingProgressCircle(onePagerData)} 
        <Heading as='h1' size='lg' marginTop="-20px">
          of funds raised
        </Heading>
      </Box>
      

    </ContentCard>
  );
};


/** Renders smaller heading. */
const SubHeading = ({ children }) => (
  <Heading as='h2' size='md' marginRight='10px'>
    {children}
  </Heading>
);
