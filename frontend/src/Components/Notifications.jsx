import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/notifications/notifications/${userId}`);
      const fetchedNotifications = response.data;
      setNotifications(fetchedNotifications);
      const unreadNotifications = fetchedNotifications.filter(notification => !notification.read);
      setUnreadCount(unreadNotifications.length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await axios.put(`http://localhost:3000/api/notifications/notifications/clear/${userId}`);
      setNotifications([]); // Clear notifications in the UI
      setUnreadCount(0); // Reset unread count
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div>
      <IconButton color="inherit" onClick={handleToggleNotifications}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>
      {showNotifications && (
        <Card style={{ position: 'fixed', top: '48px', right: '16px', zIndex: 1000 }}>
          <CardContent>
            <Button onClick={handleMarkAllRead}>Mark all read</Button>
            {notifications.length > 0 ? (
              <ul>
                {notifications.map(notification => (
                  <li key={notification._id}>
                    {notification.message}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No notifications</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Notifications;
