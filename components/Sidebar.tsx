
import React from 'react';
import { User } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: User;
  onLogout?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, currentUser, onLogout, collapsed = false, onToggleCollapse }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tổng quan', abbr: 'TQ' },
    { id: 'projects', label: 'Dự án', abbr: 'DA' },
    { id: 'transactions', label: 'Giao dịch', abbr: 'GD' },
    { id: 'admin', label: 'Admin', abbr: 'Ad' },
  ];

  const availableItems = menuItems.filter(item => {
    const isElevated = currentUser.role === 'Admin' || currentUser.role === 'SuperAdmin';
    if (item.id === 'admin') return isElevated;
    if (isElevated) return true;
    return currentUser.permissions.includes(item.id);
  });

  return (
    <div
      className="h-screen fixed left-0 top-0 flex flex-col z-40 transition-all duration-300"
      style={{
        width: collapsed ? 72 : 256,
        background: 'linear-gradient(180deg, #005992 0%, #004070 35%, #5c2a4a 65%, #D71049 100%)',
      }}
    >
      {/* Tên + chi nhánh */}
      <div
        className={`pt-5 pb-5 flex border-b border-white/10 ${collapsed ? 'px-3' : 'px-5'} justify-center ${collapsed ? 'items-center' : 'flex-col items-center gap-2'}`}
        title={collapsed ? 'VietinBank — Chi Nhánh Đông Anh' : undefined}
      >
        {collapsed ? (
          <span className="text-[10px] font-bold text-white text-center leading-tight px-0.5 max-w-[52px] block">
            Vietin
            <br />
            Bank
          </span>
        ) : (
          <>
            <p className="text-center text-xl font-bold text-white tracking-tight px-1">
              VietinBank
            </p>
            <p className="text-center text-[11px] font-semibold text-white/95 leading-snug tracking-wide px-1">
              Chi Nhánh Đông Anh
            </p>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className={`flex-1 space-y-0.5 mt-4 overflow-y-auto ${collapsed ? 'px-2' : 'px-3'}`}>
        {availableItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            title={collapsed ? item.label : undefined}
            className={`
              w-full flex items-center rounded-lg text-[13px] font-medium transition-all duration-200
              ${collapsed ? 'justify-center px-0 py-2.5' : 'px-4 py-2.5 justify-start text-left'}
              ${activeTab === item.id
                ? 'bg-white/15 text-white shadow-sm shadow-black/10'
                : 'text-white/60 hover:bg-white/8 hover:text-white/90'}
            `}
          >
            {!collapsed && item.label}
            {collapsed && (
              item.id === 'projects' ? (
                <span className="text-[10px] font-medium leading-tight text-center px-0.5 max-w-[52px]">
                  Dự<br />
                  án
                </span>
              ) : item.id === 'admin' ? (
                <span className="text-[10px] font-medium leading-tight text-center px-0.5">Admin</span>
              ) : (
                <span className="text-[10px] font-bold leading-tight text-center px-0.5">{item.abbr}</span>
              )
            )}
          </button>
        ))}
      </nav>

      {/* Hotline */}
      {!collapsed && (
        <div className="px-5 py-3 border-t border-white/10 flex flex-col items-center text-center">
          <span className="text-[10px] font-medium text-white/50">Hotline hỗ trợ</span>
          <p className="text-white font-bold text-sm mt-0.5 tracking-wide">
            0866565689
          </p>
        </div>
      )}
      {collapsed && (
        <div className="px-2 py-3 border-t border-white/10 flex justify-center">
          <span className="text-[9px] font-bold text-white/60 text-center leading-tight">0866565689</span>
        </div>
      )}

      {/* User section */}
      <div className={`border-t border-white/10 ${collapsed ? 'p-2' : 'p-3 mx-2'}`}>
        <div
          onClick={onLogout}
          className={`flex items-center rounded-lg hover:bg-white/10 transition-all cursor-pointer group ${collapsed ? 'justify-center p-2' : 'gap-3 p-2'}`}
          title={collapsed ? `${currentUser.name} — Đăng xuất` : undefined}
        >
          <img src={currentUser.avatar} alt="User" className="w-9 h-9 rounded-full object-cover border-2 border-white/20 flex-shrink-0" />
          {!collapsed && (
            <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{currentUser.name}</p>
                <p className="text-[10px] text-white/50 truncate">{currentUser.role}</p>
              </div>
              <span className="text-[10px] font-semibold text-white/50 group-hover:text-red-300 shrink-0">Đăng xuất</span>
            </div>
          )}
        </div>
      </div>

      {/* Collapse toggle — bottom */}
      <div className="border-t border-white/10">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 py-3 text-white/50 hover:text-white hover:bg-white/8 transition-all duration-200 text-sm"
          title={collapsed ? 'Mở rộng' : 'Thu gọn'}
        >
          {collapsed ? (
            <span className="text-xs font-medium">Mở rộng</span>
          ) : (
            <span className="text-xs font-medium">Thu gọn</span>
          )}
        </button>
      </div>
    </div>
  );
};
