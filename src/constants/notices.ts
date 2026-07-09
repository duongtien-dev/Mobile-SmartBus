export type NoticeType = "notification" | "news";

export type NoticeCategory = "danabus" | "transport";

export interface INotice {
    id: string;
    title: string;
    time: string;
    date: string;
    type: NoticeType;
    category: NoticeCategory;
    content: string;
    image?: number;
}

export const NOTIFICATION_ITEMS: INotice[] = [
    {
        id: "1",
        title: "Sự kiện: Giờ vàng xe buýt",
        time: "14:00",
        date: "06/11/2025",
        type: "notification",
        category: "danabus",
        content:
            "Từ ngày 10/11/2025, DanaBus triển khai chương trình Giờ vàng với mức ưu đãi đặc biệt trong khung giờ 10:00 - 14:00 các ngày trong tuần. Hành khách có thể mua vé trực tuyến hoặc tại các điểm bán vé trên tuyến.",
        image: require("../../assets/images/banner-news.png"),
    },
    {
        id: "2",
        title: "Cập nhật ứng dụng phiên bản 2.3",
        time: "04:52",
        date: "03/11/2025",
        type: "notification",
        category: "danabus",
        content:
            "Phiên bản 2.3 mang đến trải nghiệm mượt mà hơn, tối ưu hiệu năng tra cứu lộ trình và bổ sung thông báo thời gian thực khi xe buýt sắp đến trạm.",
    },
    {
        id: "3",
        title: "Cập nhật ứng dụng phiên bản 2.2",
        time: "10:15",
        date: "31/10/2025",
        type: "notification",
        category: "danabus",
        content:
            "Bản cập nhật 2.2 cải thiện giao diện thanh toán, hỗ trợ lưu phương thức thanh toán yêu thích và sửa một số lỗi nhỏ liên quan đến đăng nhập.",
    },
    {
        id: "4",
        title: "Cập nhật ứng dụng phiên bản 2.1",
        time: "08:41",
        date: "31/10/2025",
        type: "notification",
        category: "danabus",
        content:
            "Phiên bản 2.1 bổ sung tính năng đánh giá chuyến đi và cải thiện độ chính xác của bản đồ trạm dừng trên một số tuyến trọng điểm.",
    },
    {
        id: "5",
        title: "Cập nhật ứng dụng phiên bản 2.0",
        time: "08:58",
        date: "30/10/2025",
        type: "notification",
        category: "danabus",
        content:
            "DanaBus 2.0 ra mắt với giao diện mới, hệ thống thông báo được thiết kế lại và trải nghiệm mua vé nhanh hơn trên toàn bộ mạng lưới.",
    },
];

export const NEWS_ITEMS: INotice[] = [
    {
        id: "6",
        title: "Thông báo tạm dừng hoạt động tuyến xe buýt 02",
        time: "14:00",
        date: "06/11/2025",
        type: "news",
        category: "danabus",
        content:
            "Do công tác bảo trì mặt đường, tuyến xe buýt số 02 sẽ tạm dừng hoạt động trong ngày 08/11/2025. Hành khách vui lòng lựa chọn các tuyến thay thế được DanaBus công bố tại trạm và trên ứng dụng.",
        image: require("../../assets/images/banner-news.png"),
    },
    {
        id: "7",
        title: "Khai trương điểm bán vé tự động mới",
        time: "15:20",
        date: "02/11/2025",
        type: "news",
        category: "danabus",
        content:
            "DanaBus khai trương thêm 5 điểm bán vé tự động tại các trạm trung chuyển lớn, giúp hành khách mua vé nhanh hơn trong giờ cao điểm.",
    },
    {
        id: "8",
        title: "Khuyến mãi vé tháng cho sinh viên",
        time: "07:30",
        date: "29/10/2025",
        type: "news",
        category: "transport",
        content:
            "Chương trình ưu đãi vé tháng dành cho sinh viên được gia hạn đến hết quý IV/2025. Sinh viên mang thẻ sinh viên khi mua vé tại quầy hoặc xác thực trên ứng dụng để nhận ưu đãi.",
    },
    {
        id: "9",
        title: "Thông báo tạm dừng hoạt động tuyến xe buýt 03",
        time: "14:00",
        date: "06/11/2025",
        type: "news",
        category: "transport",
        content:
            "Tuyến xe buýt số 03 điều chỉnh lộ trình tạm thời do thi công hạ tầng kỹ thuật. Thời gian dự kiến hoàn tất vào ngày 15/11/2025.",
    },
    {
        id: "10",
        title: "Thông báo tạm dừng hoạt động tuyến xe buýt 04",
        time: "14:00",
        date: "06/11/2025",
        type: "news",
        category: "transport",
        content:
            "Tuyến xe buýt số 04 sẽ tạm ngừng phục vụ một số chuyến trong khung giờ 22:00 - 05:00 để phục vụ công tác bảo dưỡng phương tiện định kỳ.",
    },
];

export const ALL_NOTICES: INotice[] = [...NOTIFICATION_ITEMS, ...NEWS_ITEMS];

export function getNoticeById(id: string): INotice | undefined {
    return ALL_NOTICES.find((item) => item.id === id);
}

export function getNoticesByCategory(category: NoticeCategory): INotice[] {
    return ALL_NOTICES.filter((item) => item.category === category);
}

export const NOTICE_CATEGORY_LABELS: Record<NoticeCategory, string> = {
    danabus: "Tin tức DanaBus",
    transport: "Tin tức Ngành giao thông vận tải",
};

export const NOTICE_TYPE_LABELS: Record<NoticeType, string> = {
    notification: "Thông báo",
    news: "Tin tức",
};
