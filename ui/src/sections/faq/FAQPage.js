import Grid from '@mui/material/Grid';
import * as React from 'react';
import FAQCard from './Card';
import { questions } from './QuestionAnswers';

export default function FAQPage() {

  return (
    <>
      <Grid container spacing={2} direction="column" alignItems="center"
        justifyContent="center">
        {
          questions.map((element, key) => (
            <Grid item xs={12} sm={12} lg={12} width="100%" key={key}>
              <FAQCard answer={element.answer} question={element.question} />
            </Grid>
          ))
        }
      </Grid>
    </>
  );
}
