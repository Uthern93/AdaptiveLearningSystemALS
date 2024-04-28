import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import CalculateIcon from '@mui/icons-material/Calculate';
import { useNavigate } from 'react-router-dom';

function SubjectCard() {
  const navigate = useNavigate();

  return (
    <Card
    variant="soft"
    color="neutral"
  
        data-resizable
        sx={{
          textAlign: 'center',
          alignItems: 'center',
          width: 350,
          height: 350,
          '--icon-size': '100px',
        }}
      >
        <CardOverflow variant="solid" color="primary">
          <AspectRatio
            variant="plain"
            color="primary"
            ratio="1"
            sx={{
              m: 'auto',
              transform: 'translateY(50%)',
              borderRadius: '50%',
              width: 'var(--icon-size)',
              boxShadow: 'sm',
              bgcolor: 'background.surface',
              position: 'relative',
            }}
          >
            <div>
              <CalculateIcon color="primary" sx={{ fontSize: '4rem' }} />
            </div>
          </AspectRatio>
        </CardOverflow>
        <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
          🎊 Algebra foundations 🎊
        </Typography>
        <CardContent sx={{ maxWidth: '40ch' }}>
        Why did humans invent algebra in the first place? 
        </CardContent>
        <CardActions
          orientation="vertical"
          buttonFlex={1}
          sx={{
            '--Button-radius': '40px',
            width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
          }}
        >
          <Button variant="solid" color="primary" onClick={() => navigate("/algebra")}>
            Start
          </Button>
        </CardActions>
      </Card>
  )
}

export default SubjectCard