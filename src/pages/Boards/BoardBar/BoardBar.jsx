import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'

const MENU_STYLE = {
  color: 'white',
  bgColor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgColor: 'primary.50'
  }
}


function BoardBar( { board }) {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap:2 }}>
        <Tooltip title={board?.description}>
          <Chip
            sx={MENU_STYLE}
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
          />
        </Tooltip>
        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap:2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon/>}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >
        Invite
        </Button>
        <AvatarGroup
          max={5}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}
        >
          <Tooltip title="anhtuyetdev">
            <Avatar alt="anhtuyetdev" src="https://avatars.githubusercontent.com/u/144610782?v=4" />
          </Tooltip>
          <Tooltip title="nguyenanhaiduong">
            <Avatar alt="nguyenanhaiduong" src="https://i.pinimg.com/550x/cd/ab/4c/cdab4c07857a81b4471a50598369c48c.jpg" />
          </Tooltip>
          <Tooltip title="haiduong">
            <Avatar alt="haiduong" src="https://i.pinimg.com/474x/6f/93/c7/6f93c781390865b3774a4425b0f482d0.jpg" />
          </Tooltip>
          <Tooltip title="huutri">
            <Avatar alt="huutri" src="https://i.pinimg.com/474x/0b/c6/a9/0bc6a9c788916119f51b1e3e5d75668e.jpg" />
          </Tooltip>
          <Tooltip title="kimngan ">
            <Avatar alt="kimngan" src="https://i.pinimg.com/474x/d8/3c/70/d83c701ddb70e246e7b3697ba3603a0a.jpg" />
          </Tooltip>
          <Tooltip title="aRong">
            <Avatar alt="aRong" src="https://i.pinimg.com/474x/81/24/2b/81242b9f701ab4a0e677b91f0d1e124a.jpg" />
          </Tooltip>
          <Tooltip title="pamiuoi">
            <Avatar alt="pamiuoi" src="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/441900347_977924203696071_8197497279532155892_n.jpg?stp=c0.209.1414.1414a_cp6_dst-jpg_s206x206_tt6&_nc_cat=105&ccb=1-7&_nc_sid=50ad20&_nc_ohc=2ypvOhRHh-gQ7kNvgGpSRuB&_nc_oc=AdiuXGx2XUeYn-dEdZqsYxU30nh3ZHJrv5M8CZQvv85SOL9r7PCi5nZQZfdItJdSWGA&_nc_zt=23&_nc_ht=scontent.fhan14-1.fna&_nc_gid=AOPHKmkwYMJzqa-c2QsYxcc&oh=00_AYBN6ZqMJi7ko3SxV-WqWNYO-VoxZMmaLzMeh2odOfYxxg&oe=677F44B3" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar