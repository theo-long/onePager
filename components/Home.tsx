import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import { Accordion, IconButton, Box, Heading, Text, Divider, Button, Checkbox, CheckboxGroup, Icon, AccordionItem, AccordionHeader, AccordionPanel } from '@chakra-ui/core';


import { Header } from './Header';
import { getAllPublicOnePagerData, getOnePagerData } from '../data/dataService';
import { INDUSTRY_TAGS } from '../data/onepagers';
import { OnePagerPublicData } from '../model/model';

/** Renders the home component. */
export const Home = () => {
  const [onePagers, setOnePagers]: [OnePagerPublicData[], any] = React.useState(
    []
  );

  const [tags, setTags] = React.useState(INDUSTRY_TAGS)
  const [showFilter, setShowFilter] = React.useState(false)

  // React hook to load data on first render
  React.useEffect(() => {
    getAllPublicOnePagerData().then((result) => {
      setOnePagers(result);

      })
  }, []);





  return (
    <Box>
      <Head>
        <title>One Pager Alpha</title>
        <link rel='icon' href='/favicon.png' />
      </Head>

      <Header />

      <Box d='flex' justifyContent='center'>
        <Box w='xl'>
          <Heading as='h1' size='xl'>
            This is One Pager Alpha!
          </Heading>


          <Heading as='h2' size='md'>
            View active OnePagers
          </Heading>



          <Heading as='h3' size='sm'>
            Add Filter
              <IconButton
              variant="solid"
              variantColor="gray"
              marginTop="-10px"
              onClick={() => { setShowFilter(!showFilter) }}
              icon="add"
              aria-label="addFilter"
              size="xs" />
          </Heading>

          
          <CheckboxGroup
            id="tagBoxes"
            size="sm"
            isInline={true}
            hidden={!showFilter}
            name="tags"
            defaultValue={INDUSTRY_TAGS}
            onChange={(values) => { setTags(values as string[]); console.log(tags);}
            }>
            {INDUSTRY_TAGS.map((tag) => {
              return (
                <Checkbox value={tag}>
                  {tag}
                </Checkbox>
              )
            })}
          </CheckboxGroup>

          <Divider />

          <OnePagerLinks onePagers={onePagers.filter((item) => { return containsOneOf(tags, item.industryTags)})
          } />
        </Box>
      </Box>
    </Box>
  );
};

type OnePagerLinksProps = {
  onePagers: OnePagerPublicData[];
};

const OnePagerLinks = ({ onePagers }: OnePagerLinksProps) => {
  
  
  const onePagerList = (
    <Accordion
      allowToggle={true}
      defaultIndex={-1}
      >
      {onePagers.map((onePagerData: OnePagerPublicData) => {
        return (
          <AccordionItem>
            <AccordionHeader
              className="accordionButton"
              rounded="true">
              
              <Box fontWeight="600" fontSize="20px" textAlign="left" key={onePagerData.companyName} marginBottom='10px'>
                <Link href='/[onePagerSlug]' as={`/${onePagerData.url}`}>
                  <a>{onePagerData.companyName}</a>
                </Link>
                <Text fontWeight="400" margin='0'>{onePagerData.briefDescription}</Text>
              </Box>
            </AccordionHeader>
            <AccordionPanel>
              <Text margin="0" style={{color: "grey"}}>
                Tags: {onePagerData.industryTags.map((tag, index) => {
                  if (index != onePagerData.industryTags.length - 1) {
                    return (tag + ", ")
                  }
                  else {
                    return tag
                  }
                })}
                <br/>
                Founders: {onePagerData.founders.map((founder, index) => {
                  if (index != onePagerData.founders.length - 1) {
                    return (<><a style={{color: "#6699CC"}}>{founder.name}</a>, </>)
                  }
                  else {
                    return <a style={{color: "#6699CC"}}>{founder.name}</a>
                  }
                })}
              </Text>
              
              <Text margin="0" text-color="gray"></Text>
            </AccordionPanel>
          </AccordionItem>
          )
        }
      )}
    </Accordion>
  );
  return onePagerList;
};

// Helper function which checks if a set of strings contains any of
// the strings in a given array
const containsOneOf = (set: string[], searchStrings: string[]) => {

  // This is inefficient but there aren't many tags
  for (let i = 0; i < set.length; i++) {
    for (let j = 0; j < searchStrings.length; j++) {
      if (set[i].toLowerCase().localeCompare(searchStrings[j].toLowerCase()) == 0) {
        return true;
      }
    }
  }
  return false;
}


