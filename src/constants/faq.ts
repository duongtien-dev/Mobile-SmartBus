export type FaqItem = {
    id: string;
    question: string;
    answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
    {
        id: "1",
        question: "DanaBus có những tính năng chính nào?",
        answer:
            "DanaBus hỗ trợ tra cứu tuyến xe, tìm lộ trình nhanh nhất, theo dõi xe theo thời gian thực, mua/thanh toán vé, nhận thông báo tin tức và quản lý phương thức thanh toán ngay trên ứng dụng.",
    },
    {
        id: "2",
        question: "Làm thế nào để tìm tuyến xe buýt nhanh nhất?",
        answer:
            "Tại Trang chủ, nhập điểm đi và điểm đến rồi nhấn Tìm. Hệ thống sẽ gợi ý các tuyến phù hợp kèm thời gian dự kiến để bạn chọn lộ trình nhanh nhất.",
    },
    {
        id: "3",
        question: "Làm sao để thanh toán vé qua ứng dụng?",
        answer:
            "Vào mục Thanh toán để thêm phương thức (ví điện tử hoặc thẻ). Khi mua vé, chọn phương thức đã liên kết và xác nhận để hoàn tất giao dịch.",
    },
    {
        id: "4",
        question: "Tuyến xe buýt nào phổ biến nhất ở Đà Nẵng?",
        answer:
            "Các tuyến trung tâm và tuyến kết nối khu vực đông dân cư thường được sử dụng nhiều. Bạn có thể xem gợi ý tuyến phổ biến ngay trên Trang chủ và mục Khám phá tin tức.",
    },
    {
        id: "5",
        question: "DanaBus có hỗ trợ tiếng Anh không?",
        answer:
            "Có. Bạn có thể đổi ngôn ngữ trong mục Tài khoản → Ngôn ngữ để sử dụng ứng dụng bằng tiếng Việt hoặc tiếng Anh.",
    },
    {
        id: "6",
        question: "Làm thế nào để phản hồi vấn đề trên DanaBus?",
        answer:
            "Vào Trung tâm trợ giúp hoặc mục Đánh giá trên Trang chủ để gửi phản hồi. Bạn cũng có thể liên hệ hỗ trợ qua thông tin được công bố trong ứng dụng.",
    },
    {
        id: "7",
        question: "DanaBus có tích hợp thanh toán QR vé tháng không?",
        answer:
            "Có. Sau khi đăng ký vé tháng, bạn có thể dùng mã QR trong ứng dụng để xác thực khi lên xe theo hướng dẫn của nhà vận hành.",
    },
    {
        id: "8",
        question: "Có thể mang thú cưng lên xe hay không?",
        answer:
            "Việc mang thú cưng phụ thuộc quy định của đơn vị vận hành từng tuyến. Vui lòng kiểm tra quy định trước khi lên xe hoặc liên hệ hỗ trợ để được tư vấn cụ thể.",
    },
    {
        id: "9",
        question: "Hướng dẫn tìm lại đồ để quên trên xe?",
        answer:
            "Ghi nhớ số tuyến, biển số (nếu có) và khung giờ chuyến đi, sau đó liên hệ trung tâm hỗ trợ DanaBus hoặc đơn vị vận hành để được hỗ trợ tra cứu đồ thất lạc.",
    },
    {
        id: "10",
        question: "Đối tượng khách hàng của DanaBus là ai?",
        answer:
            "DanaBus phục vụ hành khách sử dụng xe buýt công cộng tại Đà Nẵng, bao gồm học sinh, sinh viên, người lao động và khách du lịch cần tra cứu lộ trình và thanh toán vé tiện lợi.",
    },
];
