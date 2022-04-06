import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { VFC } from 'react';

const Toc: VFC = () => {
  const data = [
    {
      name: 'テストデータ',
      url: '/test',
      top3: ['胡桃のあチーム', '歌衣メイカチーム', '星川サラチーム'],
    },
  ];

  return (
    <>
      <Typography variant="h2" mt={4}>
        以前の試合結果
      </Typography>
      <Box m={2}>
        <Grid container spacing={2}>
          {data.map((value, i) => (
            <Grid item width="20rem" key={i}>
              <Card elevation={1} square>
                <CardActionArea href={value.url}>
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                      {value.name}
                    </Typography>
                    <ol className="list-decimal list-inside ml-2">
                      <li>{value.top3[0]}</li>
                      <li>{value.top3[1]}</li>
                      <li>{value.top3[2]}</li>
                    </ol>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Toc;
