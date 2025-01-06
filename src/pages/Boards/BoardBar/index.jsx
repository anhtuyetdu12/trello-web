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


function BoardBar() {
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
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      borderBottom: '1px solid white'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap:2 }}>
        <Chip
          sx={MENU_STYLE}
          icon={<DashboardIcon />}
          label="AnhTuyetDev MERN Stack Board"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label="Public/Private workspace"
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
            '&:hover': {borderColor: 'white'}
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
              border: 'none'
            }
          }}
        >
          <Tooltip title="anhtuyetdev">
            <Avatar alt="anhtuyetdev" src="https://avatars.githubusercontent.com/u/144610782?v=4" />
          </Tooltip>
          <Tooltip title="nguyenanhaiduong">
            <Avatar alt="nguyenanhaiduong" src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/415979448_901548444666981_7001110122008128195_n.jpg?stp=c0.298.1146.1146a_dst-jpg_s206x206_tt6&_nc_cat=109&ccb=1-7&_nc_sid=50ad20&_nc_ohc=eKNZLzZ0MPYQ7kNvgH-YaDD&_nc_oc=Adiqnt6tQjkwZOtDBpCFefKoCWyBgluoO-nVrxfRp7mPdx9QU-1utEUNqGVSDLyA-Uw&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=ABL5adPjVwlbe68tzxTsQ3S&oh=00_AYD6Xt5_TcEqL-uk40XP2S63DkC8MBoD7SnCYlL6-_PNSA&oe=677F3FC5" />
          </Tooltip>
          <Tooltip title="haiduong">
            <Avatar alt="haiduong" src="https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/458406549_1044826183672539_3009340893027337130_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s206x206_tt6&_nc_cat=102&ccb=1-7&_nc_sid=50ad20&_nc_ohc=TVW0Ob6_ijcQ7kNvgG1FH9Z&_nc_oc=AdgP6Tt-AppMQHnX-seeoR34_GvSEw-syYf0OMlZFW5xka9EW3pRSUoIiTi3pDMEpUs&_nc_zt=23&_nc_ht=scontent.fhan14-4.fna&_nc_gid=Asa0GsmGf1xIffQfjqMtB3t&oh=00_AYDaT00l_VCVLzwDkC2ZLn5wO_b2J4LsBeaTEgDYWNjfpQ&oe=677F30B2" />
          </Tooltip>
          <Tooltip title="huutri">
            <Avatar alt="huutri" src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-1/437732747_2576016202581768_6803348872009973529_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-qfZHNVBG2cQ7kNvgE-jFsi&_nc_oc=AdjxbAFgxzHnSDuJiP3-fcdn1nJFiqsJ1v2e4-iIAIeyBLE-Vb1aG7XG0AH0IXEAEtI&_nc_zt=24&_nc_ht=scontent.fhan14-3.fna&_nc_gid=AtKgkMbAzDOffRZ43S-GWvV&oh=00_AYCT4tu4-57GphnxNF0ShDXyR1Y5zd6mErfFAkswOgr_2Q&oe=677F28E9" />
          </Tooltip>
          <Tooltip title="kimngan ">
            <Avatar alt="kimngan" src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/428706289_936016944553464_4987120183091206303_n.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s206x206_tt6&_nc_cat=111&ccb=1-7&_nc_sid=50ad20&_nc_ohc=yXNUq2yc4lkQ7kNvgF1dz4o&_nc_oc=AdjfEWobZc1h8VSl2UiZwyqo08ETj429ttO5tdXZ6vky3pd8DfuKK1QBcv0TqgIO3BU&_nc_zt=23&_nc_ht=scontent.fhan14-3.fna&_nc_gid=AkICP1-Fs5I34VzK18h6d8P&oh=00_AYBh8Yxq0FYH1gOR2JIlQudrOAucJVz053Jd14pGb_0F2g&oe=677F2F4E" />
          </Tooltip>
          <Tooltip title="aRong">
            <Avatar alt="aRong" src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/426152257_919221459566346_8849347994363286097_n.jpg?stp=c0.225.1366.1366a_cp6_dst-jpg_s206x206_tt6&_nc_cat=109&ccb=1-7&_nc_sid=50ad20&_nc_ohc=N7RPVzKvhBkQ7kNvgGsKtZ-&_nc_oc=AdgaGFwna2HsdAPD3B-PBc_j_gegXjstBJ9VYKVrnoZWWYTO6l4vO6RlMOQ-IgiDtbg&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=APXWXXjfNbuMUlwnKfeyIO9&oh=00_AYA1CX4gW60xtKzidXFqpvBI2of73C0rvjEuGWrQ6GVgTQ&oe=677F32FA" />
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