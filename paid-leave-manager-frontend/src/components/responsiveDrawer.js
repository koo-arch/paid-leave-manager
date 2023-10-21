import React, { useState } from 'react';
import useFetchUserInfo from '../hooks/auth/useFetchUserInfo';
import AccountButton from './accountButton';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link } from 'react-router-dom';
import {
    CssBaseline,
    AppBar,
    IconButton,
    Box,
    Typography,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 300;

const ResponsiveDrawer = ({ children }) => {
    // Reduxから認証情報を取得
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);

    // ドロワー（サイドメニュー）の状態を管理
    const [open, setOpen] = useState(false);

    // ドロワーの開閉を制御する関数
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    // ドロワー内のリストアイテムの内容を設定
    const drawer = (
        <div>
            <List>
                {isAuthenticated ?
                    // ログインしている場合はユーザー名を表示するリストアイテム
                    <div>
                        <ListItemButton component={Link} to="/account" onClick={handleDrawerClose}>
                            <ListItemText primary={user.username} />
                        </ListItemButton>
                    </div>
                    :
                    // ログインしていない場合は空のToolbarを表示
                    <Toolbar />
                }
                <Divider />
                <ListItemButton component={Link} to="/" onClick={handleDrawerClose}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="トップページ" />
                </ListItemButton>
            </List>
        </div>
    );

    // ユーザー情報をフェッチするカスタムフックを使用
    useFetchUserInfo();

    return (
        <Box sx={{
            flexGrow: 1,
            display: 'flex',
        }}>
            {/* ヘッダーコンポーネント */}
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    {/* メニューアイコン：モバイルデバイスでドロワーを開閉 */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerOpen}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* ページタイトル */}
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        有給日数管理アプリ
                    </Typography>
                    {/* アカウント関連のボタン */}
                    <AccountButton />
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                {/* モバイル用ドロワー */}
                <Drawer
                    open={open}
                    onClose={handleDrawerClose}
                    variant="temporary"
                    ModalProps={{
                        keepMounted: true, // モバイルデバイスでのパフォーマンス向上のため
                    }}
                    sx={{
                        display: { sm: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                {/* デスクトップバージョンのドロワー */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            {/* メインコンテンツ */}
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default ResponsiveDrawer;
