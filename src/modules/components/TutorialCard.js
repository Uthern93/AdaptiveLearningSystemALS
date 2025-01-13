import React from 'react';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Box,
  IconButton,
  Tooltip,
  Divider
} from '@mui/material';
import { 
  VideoLibrary, 
  Article, 
  PictureAsPdf, 
  Slideshow, 
  Games,
  Fullscreen,
  QuizOutlined
} from '@mui/icons-material';

const TutorialCard = ({ tutorial, onClick, onCreateQuiz }) => {
  const [expanded, setExpanded] = React.useState(false);

  // Function to render embedded content based on content type and URL
  const renderEmbeddedContent = (url, contentType) => {
    // YouTube URL transformation
    const getYouTubeEmbedUrl = (url) => {
      const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\?]{10,12})/);
      return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url;
    };

    // Google Drive URL transformation
    const getDriveEmbedUrl = (url) => {
      const fileId = url.match(/\/d\/(.*?)\//);
      return fileId ? `https://drive.google.com/file/d/${fileId[1]}/preview` : url;
    };

    switch (contentType) {
      case 'video':
        if (url.includes('youtube')) {
          return (
            <iframe
              width="100%"
              height={expanded ? "315" : "200"}
              src={getYouTubeEmbedUrl(url)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          );
        } else {
          return (
            <video
              width="100%"
              height={expanded ? "315" : "200"}
              controls
            >
              <source src={url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          );
        }

      case 'pdf':
        if (url.includes('drive.google.com')) {
          return (
            <iframe
              src={getDriveEmbedUrl(url)}
              width="100%"
              height={expanded ? "500" : "300"}
              frameBorder="0"
              allowFullScreen
            />
          );
        } else {
          return (
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
              width="100%"
              height={expanded ? "500" : "300"}
              frameBorder="0"
            />
          );
        }

      case 'presentation':
        return (
          <iframe
            src={url.replace('/pub?', '/embed?')}
            width="100%"
            height={expanded ? "450" : "250"}
            frameBorder="0"
            allowFullScreen
          />
        );

      case 'article':
        // For articles, we might want to show a preview or embedded webpage
        return (
          <iframe
            src={url}
            width="100%"
            height={expanded ? "500" : "300"}
            frameBorder="0"
            sandbox="allow-same-origin allow-scripts"
          />
        );

      case 'interactive':
        return (
          <iframe
            src={url}
            width="100%"
            height={expanded ? "500" : "300"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );

      default:
        return (
          <Typography variant="body2" color="text.secondary">
            <a href={url} target="_blank" rel="noopener noreferrer">
              View Content
            </a>
          </Typography>
        );
    }
  };

  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <VideoLibrary />;
      case 'article':
        return <Article />;
      case 'pdf':
        return <PictureAsPdf />;
      case 'presentation':
        return <Slideshow />;
      case 'interactive':
        return <Games />;
      default:
        return null;
    }
  };

  return (
    <Card sx={{ 
      width: expanded ? '100%' : 300, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'all 0.3s ease',
      position: 'relative',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      }
    }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: 2 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {getContentTypeIcon(tutorial.content_type)}
            <Typography variant="caption" sx={{ ml: 1 }}>
              {tutorial.content_type}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Create Quiz">
              <IconButton 
                onClick={(e) => {
                  e.stopPropagation();
                  onCreateQuiz(tutorial);
                }}
                size="small"
                sx={{
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                  }
                }}
              >
                <QuizOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title={expanded ? "Collapse" : "Expand"}>
              <IconButton 
                onClick={() => setExpanded(!expanded)}
                size="small"
              >
                <Fullscreen />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        <Typography 
          variant="h6" 
          component="div" 
          gutterBottom
          sx={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'primary.main'
          }}
        >
          {tutorial.title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          gutterBottom
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: expanded ? 'unset' : 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 2
          }}
        >
          {tutorial.description}
        </Typography>
        
        <Box sx={{ 
          mt: 2, 
          width: '100%',
          height: expanded ? 'auto' : '300px',
          overflow: 'hidden',
          borderRadius: '8px',
          border: '1px solid rgba(0,0,0,0.12)'
        }}>
          {renderEmbeddedContent(tutorial.url, tutorial.content_type)}
        </Box>
      </CardContent>
      
      <Divider sx={{ mx: 2 }} />
      
      <CardActions sx={{ 
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            size="small" 
            onClick={onClick}
            variant="contained"
            startIcon={<QuizOutlined />}
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark'
              }
            }}
          >
            Take Quiz
          </Button>
          <Button 
            size="small" 
            href={tutorial.url} 
            target="_blank" 
            rel="noopener noreferrer"
            variant="outlined"
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark',
                backgroundColor: 'rgba(25, 118, 210, 0.04)'
              }
            }}
          >
            Open in New Tab
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default TutorialCard;