import { useState } from 'react';

// material-ui
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';

// project import
import InfoTable from '../components/InfoTable';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import AreaChart from '../components/AreaChart';
import ColumnChart from '../components/ColumnChart';
import MainCard from '../components/MainCard';
import { useLocation } from "react-router-dom";
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import avatar1 from "@mui/material/Avatar";
import avatar2 from "@mui/material/Avatar";
import avatar3 from "@mui/material/Avatar";
import avatar4 from "@mui/material/Avatar";
import Linechart from '../components/LineChart';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// sales report status
const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];


const Dashboard = () => {
  const [value, setValue] = useState('today');
  const [slot, setSlot] = useState('week');
  const location = useLocation();
  const { username } = location.state || {};
  console.log(username);

  return (
    <>
<Typography variant="h5">{username ? `${username}'s Dashboard` : "'Dashboard"}</Typography>

    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
     
      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Avtivity</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
            <Button
  size="small"
  onClick={() => setSlot('month')}
  sx={{
    backgroundColor: slot === 'month' ? '#003366' : 'transparent', // Dark blue background if active, transparent otherwise
    color: slot === 'month' ? 'white' : 'black', // White text if active, black otherwise
    '&:hover': {
      backgroundColor: '#002147', // Darker shade of blue on hover
    },
    mr: 1, // Margin right for spacing
  }}
>
  Month
</Button>

<Button
  size="small"
  onClick={() => setSlot('week')}
  sx={{
    backgroundColor: slot === 'week' ? '#003366' : 'transparent', // Dark blue background if active, transparent otherwise
    color: slot === 'week' ? 'white' : 'black', // White text if active, black otherwise
    '&:hover': {
      backgroundColor: '#002147', // Darker shade of blue on hover
    },
  }}
>
  Week
</Button>

            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
          <LineChart slot={slot} username={username}/>
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        {/* <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Correct Answers</Typography>
          </Grid>
          <Grid item />
        </Grid> */}
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
              Correct answers
              </Typography>
              <Typography variant="h4">Total</Typography>
            </Stack>
          </Box>
          <BarChart />
        </MainCard>
      </Grid>
      
    </Grid>
    </>
  );
};

export default Dashboard;