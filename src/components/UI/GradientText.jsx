import Typography from '@mui/material/Typography'

export default function GradientText({ text, ...props }) {
  return (
    <Typography
      {...props}
      style={{
        backgroundImage: 'linear-gradient(107deg, #0DC6B4 8%, #21C68A',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {text}
    </Typography>
  )
}
