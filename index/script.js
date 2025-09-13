/**
 * 购物平台JavaScript功能
 * 包含商品展示、购物车管理、用户登录等功能
 */

// 模拟商品数据，增加分类属性
const products = [
    { 
        id: 1,
        name: "高端智能手机",
        price: 3999,
        image: "https://wwwstatic.vivo.com.cn/vivoportal/files/image/detail/20231109/0655532018806b0df61431edcc2aa94e.png",
        description: "最新款智能手机，搭载高性能处理器，超清显示屏幕，续航能力强。",
        category: "电子产品"
    },
    {
        id: 2,
        name: "无线蓝牙耳机",
        price: 799,
        image: "https://shopstatic.vivo.com.cn/vivoshop/commodity/commodity/10011126_1753341873286_750x750.png.webp",
        description: "高品质无线蓝牙耳机，降噪功能出色，佩戴舒适。",
        category: "电子产品"
    },
    {
        id: 3,
        name: "智能手表",
        price: 1299,
        image: "https://wwwstatic.vivo.com.cn/vivoportal/files/image/detail/20240403/5c0be7d1b30071a23ccb12995cfbdaf5.png",
        description: "多功能智能手表，健康监测，消息提醒，运动模式。",
        category: "电子产品"
    },
    {
        id: 4,
        name: "笔记本电脑",
        price: 5999,
        image: "https://ts1.tc.mm.bing.net/th/id/R-C.2e7b5e3b426ca1da4206514a58ff2e68?rik=sCdbejENSr3lyA&riu=http%3a%2f%2fpro-img.zuyushop.com%2fProPic%2f201711%2f201711001104236726.jpg&ehk=fd5%2bDsLrde%2beWjWArotcPWMEh4jU6VNzL%2fpD1fMO3t0%3d&risl=&pid=ImgRaw&r=0",
        description: "轻薄便携笔记本电脑，高性能处理器，长续航时间。",
        category: "电子产品"
    },
    {
        id: 5,
        name: "运动鞋",
        price: 499,
        image: "https://static.nike.com.cn/a/images/c_limit,w_592,f_auto/t_product_v1/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-force-1-07-%E7%94%B7%E5%AD%90%E7%A9%BA%E5%86%9B%E4%B8%80%E5%8F%B7%E8%BF%90%E5%8A%A8%E9%9E%8B%E6%9D%BF%E9%9E%8B-67bN20.png",
        description: "舒适透气运动鞋，缓震技术，适合各种运动场景。",
        category: "服装鞋帽"
    },
    {
        id: 6,
        name: "休闲T恤",
        price: 99,
        image: "https://static.nike.com.cn/a/images/c_limit,w_592,f_auto/t_product_v1/46507689-9e00-46fc-a2af-d29732998dfa/sportswear-club-%E7%94%B7%E5%AD%90%E5%8A%A0%E7%BB%92%E5%9C%86%E9%A2%86%E4%B8%8A%E8%A1%A3-G17MNRha.png",
        description: "纯棉休闲T恤，舒适透气，多色可选。",
        category: "服装鞋帽"
    },
    {
        id: 7,
        name: "林氏家居奶油风软包科技布艺主卧室1米8大床家用简约女生双人床架",
        price: 299,
        image: "https://gw.alicdn.com/imgextra/O1CN01ZOdOqG1m5cvpa0ecg_!!143584903.jpg",
        description: "饱满Q弹靠包像泡芙般松软",
        category: "家居家装"

    }
];

// 预设用户账号密码数据
const validUsers = [
    { 
        email: "admin@qq.com", 
        password: "admin123",
        name: "主人",
        avatar: "https://img.tuxiangyan.com/zb_users/upload/2023/02/202302091675904134407256.jpg"
    },
    { 
        email: "user@qq.com", 
        password: "user123",
        name: "少爷",
        avatar: "https://img.tuxiangyan.com/zb_users/upload/2023/02/202302091675904134407256.jpg"
    }
];

// DOM元素 - 添加分类详情相关元素
const navTabs = document.querySelectorAll('.nav-tab');
const contentSections = document.querySelectorAll('.content-section');
const productsContainer = document.getElementById('products-container');
const searchInput = document.getElementById('search-input');
const cartItemsContainer = document.getElementById('cart-items-container');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
const cartCountElement = document.querySelector('.cart-count');
const loginButton = document.getElementById('login-button');
const loginModal = document.getElementById('login-modal');
const closeLoginButton = document.getElementById('close-login');
const submitLoginButton = document.getElementById('submit-login');
const userAvatar = document.getElementById('user-avatar');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const productDetailSection = document.getElementById('product-detail');
const detailImage = document.getElementById('detail-image');
const detailTitle = document.getElementById('detail-title');
const detailPrice = document.getElementById('detail-price');
const detailDescription = document.getElementById('detail-description');
const addToCartBtn = document.getElementById('add-to-cart-btn');
const categoryDetailSection = document.getElementById('category-detail');
const currentCategoryElement = document.getElementById('current-category');
const categoryIconElement = document.getElementById('category-icon');
const categoryDescriptionElement = document.getElementById('category-description');
const categoryProductsContainer = document.getElementById('category-products-container');
const backToCategoryButton = document.getElementById('back-to-category');

// 在文件开头的 DOM 元素声明后添加 showNotification 函数
// 添加 showNotification 函数
/**
 * 显示通知消息
 * @param {string} message 通知内容
 */
function showNotification(message) {
    // 检查通知元素是否已存在
    let notificationElement = document.getElementById('notification');
    
    if (!notificationElement) {
        // 创建通知元素
        notificationElement = document.createElement('div');
        notificationElement.id = 'notification';
        notificationElement.className = 'notification';
        document.body.appendChild(notificationElement);
        
        // 添加 CSS 样式
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                background-color: #333;
                color: white;
                border-radius: 4px;
                z-index: 1000;
                max-width: 300px;
                animation: slideIn 1s ease-out;
                opacity: 1;
                transition: opacity 1.5s ease-out;
            }
            
            .notification.fade-out {
                opacity: 0;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // 设置通知内容
    notificationElement.textContent = message;
    
    // 确保移除可能存在的fade-out类
    notificationElement.classList.remove('fade-out');
    
    // 显示通知
    notificationElement.style.display = 'block';
    
    // 5秒后缓慢隐藏
    setTimeout(() => {
        notificationElement.classList.add('fade-out');
        // 等待淡出动画结束后再隐藏元素
        setTimeout(() => {
            notificationElement.style.display = 'none';
        }, 1500); // 与CSS中设置的过渡时间保持一致
    }, 3000);
}

// 当前用户和购物车状态
let currentUser = null;
let cart = [];

/**
 * 初始化应用
 */
function init() {
    loadProducts();
    setupEventListeners();
    loadCartFromStorage();
    updateCartUI();
    checkLoginStatus();
}

/**
 * 加载商品列表
 */
function loadProducts() {
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
    });
}

/**
 * 创建商品元素
 * @param {Object} product 商品对象
 * @returns {HTMLElement} 商品元素
 */
function createProductElement(product) {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">¥${product.price.toFixed(2)}</div>
            <div class="product-actions">
                <button class="btn btn-outline">详情</button>
                <button class="btn btn-primary" data-id="${product.id}">加入购物车</button>
            </div>
        </div>
    `;

    // 添加详情按钮事件
    div.querySelector('.btn-outline').addEventListener('click', () => {
        showProductDetail(product);
    });

    // 添加购物车按钮事件
    div.querySelector('.btn-primary').addEventListener('click', () => {
        addToCart(product);
    });

    return div;
}

/**
 * 显示商品详情
 * @param {Object} product 商品对象
 */
function showProductDetail(product) {
    detailImage.src = product.image;
    detailTitle.textContent = product.name;
    detailPrice.textContent = `¥${product.price.toFixed(2)}`;
    detailDescription.textContent = product.description;

    // 设置加入购物车按钮的数据属性
    addToCartBtn.setAttribute('data-id', product.id);

    // 隐藏所有内容部分，显示详情部分
    contentSections.forEach(section => {
        section.classList.remove('active');
    });
    productDetailSection.classList.add('active');
    
    // 更新底部导航栏的激活状态
    navTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    // 商品详情页没有对应的底部导航标签，暂时不激活任何标签
}

/**
 * 添加到购物车
 * @param {Object} product 商品对象
 */
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCartToStorage();
    updateCartUI();

    // 显示添加成功的反馈
    showNotification(`已添加 ${product.name} 到购物车`);
}

/**
 * 更新购物车UI
 */
function updateCartUI() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">购物车为空</div>';
        subtotalElement.textContent = '¥0.00';
        totalElement.textContent = '¥0.00';
        cartCountElement.textContent = '0';
        return;
    }

    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.name}</h3>
                <div class="cart-item-price">¥${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                <button class="remove-btn" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItemElement);
    });

    // 更新总价
    subtotalElement.textContent = `¥${subtotal.toFixed(2)}`;
    totalElement.textContent = `¥${subtotal.toFixed(2)}`;

    // 更新购物车数量
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalQuantity;

    // 添加购物车项目事件监听
    attachCartItemEvents();
}

/**
 * 添加购物车项目事件监听
 */
function attachCartItemEvents() {
    // 减少数量按钮
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const item = cart.find(item => item.id === id);

            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart = cart.filter(item => item.id !== id);
            }

            saveCartToStorage();
            updateCartUI();
        });
    });

    // 增加数量按钮
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const item = cart.find(item => item.id === id);
            item.quantity += 1;

            saveCartToStorage();
            updateCartUI();
        });
    });

    // 数量输入框
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const item = cart.find(item => item.id === id);
            const newQuantity = parseInt(e.target.value);

            if (newQuantity > 0) {
                item.quantity = newQuantity;
            } else {
                cart = cart.filter(item => item.id !== id);
            }

            saveCartToStorage();
            updateCartUI();
        });
    });

    // 删除按钮
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('.remove-btn').getAttribute('data-id'));
            cart = cart.filter(item => item.id !== id);

            saveCartToStorage();
            updateCartUI();
        });
    });
}

/**
 * 保存购物车到本地存储
 */
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * 从本地存储加载购物车
 */
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

/**
 * 更新用户UI
 */
function updateUserUI() {
    if (currentUser) {
        // 安全地更新用户信息
        if (userAvatar) userAvatar.src = currentUser.avatar || "https://via.placeholder.com/100";
        if (userName) userName.textContent = currentUser.name || "未知用户";
        if (userEmail) userEmail.textContent = currentUser.email || "";
        if (loginButton) loginButton.textContent = '退出登录';
    } else {
        // 使用默认头像，避免网络问题
        if (userAvatar) userAvatar.src = "https://img.tuxiangyan.com/zb_users/upload/2023/02/202302091675904134407256.jpg";
        if (userName) userName.textContent = "未登录";
        if (userEmail) userEmail.textContent = "请登录以查看个人信息";
        if (loginButton) loginButton.textContent = '登录/注册';
    }
}

/**
 * 检查登录状态
 */
function checkLoginStatus() {
    try {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            // 确保用户有头像URL，如果没有则使用默认头像
            if (currentUser && !currentUser.avatar) {
                currentUser.avatar = "https://via.placeholder.com/100";
            }
            updateUserUI();
        }
    } catch (e) {
        console.error('检查登录状态时出错:', e);
        // 如果解析localStorage中的用户信息出错，则清除该信息
        localStorage.removeItem('currentUser');
    }
}

// 在文件开头的DOM元素部分添加结算按钮的引用
const checkoutBtn = document.getElementById('checkout-btn');

/**
 * 设置事件监听
 */
function setupEventListeners() {
    // 导航标签点击事件
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');

            // 激活选中的标签
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 显示对应的内容部分
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(target).classList.add('active');
        });
    });

    // 购物车按钮点击事件
    document.getElementById('cart-button').addEventListener('click', () => {
        // 激活购物车标签
        navTabs.forEach(t => t.classList.remove('active'));
        document.querySelector('[data-target="cart"]').classList.add('active');

        // 显示购物车内容
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById('cart').classList.add('active');
    });

    // 搜索输入事件
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        if (searchTerm) {
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm)
            );

            productsContainer.innerHTML = '';
            filteredProducts.forEach(product => {
                const productElement = createProductElement(product);
                productsContainer.appendChild(productElement);
            });
        } else {
            loadProducts();
        }
    });

    // 登录按钮点击事件
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            if (currentUser) {
                // 退出登录
                currentUser = null;
                try {
                    localStorage.removeItem('currentUser');
                } catch (e) {
                    console.error('移除用户信息时出错:', e);
                }
                updateUserUI();
            } else {
                // 显示登录模态框
                if (loginModal) {
                    loginModal.style.display = 'flex';
                    // 添加active类以确保模态框正确显示（处理透明度问题）
                    loginModal.classList.add('active');
                }
            }
        });
    }

    // 关闭登录模态框
    if (closeLoginButton) {
        closeLoginButton.addEventListener('click', () => {
            if (loginModal) {
                loginModal.style.display = 'none';
                // 移除active类以确保下次正确显示
                loginModal.classList.remove('active');
            }
        });
    }
    
    // 点击模态框背景关闭模态框
    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
                loginModal.classList.remove('active');
            }
        });
    }

    // 提交登录
    if (submitLoginButton) {
        submitLoginButton.addEventListener('click', () => {
            const email = document.getElementById('email') ? document.getElementById('email').value : '';
            const password = document.getElementById('password') ? document.getElementById('password').value : '';

            if (!email || !password) {
                alert('请输入邮箱和密码');
                return;
            }

            // 验证账号密码
            const user = validUsers.find(u => u.email === email && u.password === password);
            
            if (user) {
                // 登录成功
                currentUser = {
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar
                };

                try {
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                } catch (e) {
                    console.error('保存用户信息到localStorage时出错:', e);
                }

                updateUserUI();

                // 安全地隐藏登录模态框
                if (loginModal) {
                    loginModal.style.display = 'none';
                    loginModal.classList.remove('active');
                }

                // 安全地清空输入框
                const emailInput = document.getElementById('email');
                const passwordInput = document.getElementById('password');
                if (emailInput) emailInput.value = '';
                if (passwordInput) passwordInput.value = '';
                
                // 显示登录成功通知
                showNotification(`欢迎回来，${user.name}！`);
            } else {
                // 登录失败
                alert('邮箱或密码错误，请重新输入！');
            }
        });
    }

    // 详情页加入购物车按钮
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const productId = parseInt(addToCartBtn.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);

            if (product) {
                addToCart(product);
            }
        });
    }

    // 商品详情页面返回按钮点击事件
    const backToHomeFromDetailButton = document.getElementById('back-to-home-from-detail');
    if (backToHomeFromDetailButton) {
        backToHomeFromDetailButton.addEventListener('click', () => {
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById('home').classList.add('active');
            
            // 更新底部导航栏的激活状态
            navTabs.forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelector('[data-target="home"]').classList.add('active');
        });
    }

    // 分类卡片点击事件
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            // 获取分类名称
            const categoryName = card.querySelector('h3').textContent;

            // 显示分类详情
            showCategoryDetail(categoryName);

            // 显示通知
            showNotification(`已进入${categoryName}分类`);
            
            // 更新底部导航栏的激活状态
            navTabs.forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelector('[data-target="category"]').classList.add('active');
        });
    });

    // 返回分类列表按钮点击事件
    backToCategoryButton.addEventListener('click', () => {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById('category').classList.add('active');
        
        // 更新底部导航栏的激活状态
        navTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector('[data-target="category"]').classList.add('active');
        
        // 移除可能存在的返回主页按钮
        const backToHomeButton = document.getElementById('back-to-home');
        if (backToHomeButton) {
            backToHomeButton.remove();
        }
    });

    // 为个人资料菜单添加事件监听
    document.querySelectorAll('.profile-menu .menu-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            // 隐藏所有内容部分
            contentSections.forEach(section => {
                section.classList.remove('active');
            });

            // 根据点击的菜单项显示对应的页面
            const targetSections = ['my-orders', 'address-book', 'logistics-tracking', 'help-center', 'settings'];
            document.getElementById(targetSections[index]).classList.add('active');
            
            // 更新底部导航栏的激活状态
            navTabs.forEach(tab => {
                tab.classList.remove('active');
            });
            
            // 根据不同的菜单项激活对应的底部导航标签
            switch(targetSections[index]) {
                case 'my-orders':
                case 'address-book':
                case 'logistics-tracking':
                case 'help-center':
                case 'settings':
                    // 这些页面都属于"我的"部分，激活"我的"标签
                    document.querySelector('[data-target="profile"]').classList.add('active');
                    break;
            }
            
            // 如果是物流跟踪页面，更新选项
            if (targetSections[index] === 'logistics-tracking') {
                updateLogisticsOrderOptions();
            }
        });
    });
    
    // 为结算按钮添加点击事件
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
}

/**
 * 显示分类详情
 * @param {string} categoryName 分类名称
 */
function showCategoryDetail(categoryName) {
    // 更新分类标题
    currentCategoryElement.textContent = categoryName;

    // 根据分类名称设置图标和描述
    setCategoryIconAndDescription(categoryName);

    // 加载该分类的商品
    loadCategoryProducts(categoryName);

    // 隐藏所有内容部分，显示分类详情部分
    contentSections.forEach(section => {
        section.classList.remove('active');
    });
    categoryDetailSection.classList.add('active');
}

/**
 * 设置分类图标和描述
 * @param {string} categoryName 分类名称
 */
function setCategoryIconAndDescription(categoryName) {
    // 根据分类名称获取对应的图标和描述
    let iconClass = '';
    let description = '';
    
    switch(categoryName) {
        case '电子产品':
            iconClass = 'fas fa-mobile-alt';
            description = '各种电子设备，包括手机、电脑、耳机等数码产品';
            break;
        case '服装鞋帽':
            iconClass = 'fas fa-tshirt';
            description = '时尚服装、舒适鞋履，满足您的穿搭需求';
            break;
        case '食品生鲜':
            iconClass = 'fas fa-utensils';
            description = '新鲜食材、美味零食，舌尖上的享受';
            break;
        case '家居家装':
            iconClass = 'fas fa-couch';
            description = '家居用品、装饰摆件，打造温馨舒适的家';
            break;
        default:
            iconClass = 'fas fa-box';
            description = '各类精选商品，品质保证';
    }
    
    // 更新图标和描述
    categoryIconElement.innerHTML = `<i class="${iconClass}"></i>`;
    categoryDescriptionElement.textContent = description;
}

/**
 * 加载分类商品
 * @param {string} categoryName 分类名称
 */
function loadCategoryProducts(categoryName) {
    categoryProductsContainer.innerHTML = '';
    
    // 筛选该分类的商品
    const filteredProducts = products.filter(product => 
        product.category === categoryName
    );
    
    if (filteredProducts.length === 0) {
        categoryProductsContainer.innerHTML = '<div class="empty-category">该分类暂无商品</div>';
        return;
    }
    
    // 显示筛选后的商品
    filteredProducts.forEach(product => {
        const productElement = createProductElement(product);
        categoryProductsContainer.appendChild(productElement);
    });
}

/**
 * 我的订单功能实现
 */

// 模拟订单数据
const mockOrders = [
    {
        id: 1001,
        orderNumber: 'ORD20230715001',
        status: 'delivering',
        date: '2023-07-15',
        totalAmount: 3999,
        products: [
            { id: 1, name: '高端智能手机', price: 3999, quantity: 1, image: 'https://wwwstatic.vivo.com.cn/vivoportal/files/image/detail/20231109/0655532018806b0df61431edcc2aa94e.png' }
        ]
    },
    {
        id: 1002,
        orderNumber: 'ORD20230710001',
        status: 'completed',
        date: '2023-07-10',
        totalAmount: 799,
        products: [
            { id: 2, name: '无线蓝牙耳机', price: 799, quantity: 1, image: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/commodity/10011126_1753341873286_750x750.png.webp' }
        ]
    },
    {
        id: 1003,
        orderNumber: 'ORD20230705001',
        status: 'pending',
        date: '2023-07-05',
        totalAmount: 1299,
        products: [
            { id: 3, name: '智能手表', price: 1299, quantity: 1, image: 'https://wwwstatic.vivo.com.cn/vivoportal/files/image/detail/20240403/5c0be7d1b30071a23ccb12995cfbdaf5.png' }
        ]
    }
];

// 订单状态映射
const orderStatusMap = {
    'all': '全部订单',
    'pending': '待付款',
    'shipped': '待发货',
    'delivering': '待收货',
    'completed': '已完成'
};

// 显示我的订单
function showMyOrders() {
    const ordersContainer = document.getElementById('orders-container');
    const orderTabs = document.querySelectorAll('.order-tab');
    
    // 初始加载所有订单
    loadOrders('all');
    
    // 添加订单标签点击事件
    orderTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const status = tab.getAttribute('data-status');
            
            // 更新激活状态
            orderTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // 加载对应状态的订单
            loadOrders(status);
        });
    });
}

// 加载订单列表
function loadOrders(status) {
    const ordersContainer = document.getElementById('orders-container');
    let filteredOrders = mockOrders;
    
    // 根据状态筛选订单
    if (status !== 'all') {
        filteredOrders = mockOrders.filter(order => order.status === status);
    }
    
    // 清空容器
    ordersContainer.innerHTML = '';
    
    // 显示订单
    if (filteredOrders.length === 0) {
        ordersContainer.innerHTML = '<div class="empty-cart">暂无订单</div>';
    } else {
        filteredOrders.forEach(order => {
            const orderElement = createOrderElement(order);
            ordersContainer.appendChild(orderElement);
        });
    }
}

// 创建订单元素
// 修改createOrderElement函数，为所有状态的订单按钮添加事件监听
function createOrderElement(order) {
    const div = document.createElement('div');
    div.className = 'order-item';
    
    // 生成订单商品HTML
    let productsHTML = '';
    order.products.forEach(product => {
        productsHTML += `
            <div class="order-product">
                <img src="${product.image}" alt="${product.name}" class="order-product-image">
                <div class="order-product-info">
                    <div class="order-product-title">${product.name}</div>
                    <div class="order-product-price">¥${product.price.toFixed(2)} x ${product.quantity}</div>
                </div>
            </div>
        `;
    });
    
    // 生成订单操作按钮
    let actionsHTML = '';
    switch (order.status) {
        case 'pending':
            actionsHTML = `
                <button class="order-action-btn order-action-btn-primary pay-btn" data-order-id="${order.id}">去支付</button>
                <button class="order-action-btn order-action-btn-outline cancel-btn" data-order-id="${order.id}">取消订单</button>
            `;
            break;
        case 'delivering':
            actionsHTML = `
                <button class="order-action-btn order-action-btn-primary confirm-btn" data-order-id="${order.id}">确认收货</button>
                <button class="order-action-btn order-action-btn-outline logistics-btn" data-order-id="${order.id}">查看物流</button>
            `;
            break;
        case 'completed':
            actionsHTML = `
                <button class="order-action-btn order-action-btn-outline rebuy-btn" data-order-id="${order.id}">再次购买</button>
                <button class="order-action-btn order-action-btn-outline review-btn" data-order-id="${order.id}">评价晒单</button>
            `;
            break;
        default:
            actionsHTML = `
                <button class="order-action-btn order-action-btn-outline detail-btn" data-order-id="${order.id}">查看详情</button>
            `;
    }
    
    div.innerHTML = `
        <div class="order-header">
            <div class="order-number">订单号：${order.orderNumber}</div>
            <div class="order-status">${orderStatusMap[order.status]}</div>
        </div>
        <div class="order-products">
            ${productsHTML}
        </div>
        <div class="order-summary">
            <div class="order-total">共${order.products.length}件商品 合计：¥${order.totalAmount.toFixed(2)}</div>
            <div class="order-actions">
                ${actionsHTML}
            </div>
        </div>
    `;
    
    // 添加订单按钮事件监听
    if (order.status === 'pending') {
        // 为去支付按钮添加点击事件
        const payBtn = div.querySelector('.pay-btn');
        payBtn.addEventListener('click', () => handlePayment(order));
        
        // 为取消订单按钮添加点击事件
        const cancelBtn = div.querySelector('.cancel-btn');
        cancelBtn.addEventListener('click', () => cancelOrder(order.id));
    } else if (order.status === 'delivering') {
        // 为确认收货按钮添加点击事件
        const confirmBtn = div.querySelector('.confirm-btn');
        confirmBtn.addEventListener('click', () => confirmDelivery(order.id));
        
        // 为查看物流按钮添加点击事件
        const logisticsBtn = div.querySelector('.logistics-btn');
        logisticsBtn.addEventListener('click', () => showLogisticsDetails(order.id));
    } else if (order.status === 'completed') {
        // 为再次购买按钮添加点击事件
        const rebuyBtn = div.querySelector('.rebuy-btn');
        rebuyBtn.addEventListener('click', () => rebuy(order));
        
        // 为评价晒单按钮添加点击事件
        const reviewBtn = div.querySelector('.review-btn');
        reviewBtn.addEventListener('click', () => review(order.id));
    } else {
        // 为查看详情按钮添加点击事件
        const detailBtn = div.querySelector('.detail-btn');
        detailBtn.addEventListener('click', () => showOrderDetail(order.id));
    }
    
    return div;
}

// 修改confirmDelivery函数，在确认收货时更新物流状态
function confirmDelivery(orderId) {
    if (confirm('确认已收到商品吗？')) {
        const orderIndex = mockOrders.findIndex(o => o.id === orderId);
        if (orderIndex !== -1) {
            mockOrders[orderIndex].status = 'completed';
            
            // 保存订单到本地存储
            localStorage.setItem('orders', JSON.stringify(mockOrders));
            
            // 更新物流状态为已签收
            updateLogisticsDataAfterDelivery(orderId);
            
            // 重新加载订单列表
            loadOrders(document.querySelector('.order-tabs .active').getAttribute('data-status') || 'all');
            
            // 更新物流跟踪页面的订单选项
            updateLogisticsOrderOptions();
            
            showNotification('已确认收货，感谢您的购买！');
        }
    }
}

// 确认收货后更新物流数据
function updateLogisticsDataAfterDelivery(orderId) {
    // 从本地存储获取物流数据，如果没有则使用模拟数据
    let logisticsData = JSON.parse(localStorage.getItem('logisticsData')) || mockLogisticsData;
    
    if (logisticsData[orderId]) {
        const now = new Date();
        const newStep = {
            time: now.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
            status: '包裹已签收，感谢您的购买！'
        };
        logisticsData[orderId].steps.unshift(newStep);
        
        // 保存物流数据到本地存储
        localStorage.setItem('logisticsData', JSON.stringify(logisticsData));
        
        // 如果当前在物流跟踪页面，更新显示
        if (document.getElementById('logistics-tracking').classList.contains('active')) {
            const orderSelect = document.getElementById('order-select');
            if (parseInt(orderSelect.value) === orderId) {
                showLogisticsInfo(orderId);
            }
        }
    }
}

// 添加显示物流详情函数
function showLogisticsDetails(orderId) {
    // 隐藏所有内容部分
    contentSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示物流跟踪页面
    document.getElementById('logistics-tracking').classList.add('active');
    
    // 显示该订单的物流信息
    showLogisticsInfo(orderId);
    
    // 更新订单选择下拉框
    const orderSelect = document.getElementById('order-select');
    orderSelect.value = orderId;
}

// 添加再次购买函数
function rebuy(order) {
    // 将订单中的商品添加到购物车
    order.products.forEach(product => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                image: product.image
            });
        }
    });
    
    // 保存购物车到本地存储
    saveCartToStorage();
    
    // 更新购物车UI
    updateCartUI();
    
    // 显示成功提示
    showNotification('已将商品添加到购物车！');
    
    // 切换到购物车页面
    contentSections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('cart').classList.add('active');
}

// 添加评价晒单函数
function review(orderId) {
    // 这里可以实现评价晒单功能
    // 简单实现：显示提示并可以跳转到商品详情页进行评价
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
        alert('评价功能即将上线，敬请期待！');
        // 实际实现中可以打开评价模态框或跳转到评价页面
    }
}

// 添加查看订单详情函数
function showOrderDetail(orderId) {
    // 这里可以实现查看订单详情功能
    // 简单实现：显示订单基本信息
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
        let productList = order.products.map(p => `${p.name} x ${p.quantity}`).join('\n');
        alert(`订单详情：\n订单号：${order.orderNumber}\n订单状态：${orderStatusMap[order.status]}\n下单时间：${order.date}\n商品列表：\n${productList}\n总计金额：¥${order.totalAmount.toFixed(2)}`);
        // 实际实现中可以打开详情模态框或跳转到详情页面
    }
}

/**
 * 处理订单支付
 */
function handlePayment(order) {
    // 模拟支付成功
    showNotification(`订单${order.orderNumber}支付成功！`);
    
    // 更新订单状态为配送中
    const orderIndex = mockOrders.findIndex(o => o.id === order.id);
    if (orderIndex !== -1) {
        mockOrders[orderIndex].status = 'delivering';
        
        // 保存订单到本地存储
        localStorage.setItem('orders', JSON.stringify(mockOrders));
    }
    
    // 更新物流状态
    updateLogisticsDataAfterPayment(order.id);
    
    // 重新加载订单列表
    loadOrders(document.querySelector('.order-tabs .active').getAttribute('data-status') || 'all');
    
    // 更新物流跟踪页面的订单选项
    updateLogisticsOrderOptions();
}

// 在支付后更新物流数据
function updateLogisticsDataAfterPayment(orderId) {
    // 从本地存储获取物流数据，如果没有则使用模拟数据
    let logisticsData = JSON.parse(localStorage.getItem('logisticsData')) || mockLogisticsData;
    
    if (logisticsData[orderId]) {
        const now = new Date();
        const updatedSteps = [
            {
                time: now.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
                status: '订单已支付，商家正在备货'
            },
            {
                time: new Date(now.getTime() + 1 * 60 * 60 * 1000).toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
                status: '商品已出库，正在安排发货'
            }
        ];
        
        logisticsData[orderId].steps = updatedSteps.concat(logisticsData[orderId].steps);
        
        // 保存物流数据到本地存储
        localStorage.setItem('logisticsData', JSON.stringify(logisticsData));
        
        // 如果当前在物流跟踪页面，更新显示
        if (document.getElementById('logistics-tracking').classList.contains('active')) {
            const orderSelect = document.getElementById('order-select');
            if (parseInt(orderSelect.value) === orderId) {
                showLogisticsInfo(orderId);
            }
        }
    }
}

/**
 * 结算功能实现
 */
function checkout() {
    // 检查用户是否登录
    if (!currentUser) {
        alert('请先登录');
        if (loginModal) {
            loginModal.style.display = 'flex';
            // 添加active类以确保模态框正确显示（处理透明度问题）
            loginModal.classList.add('active');
        }
        return;
    }
    
    // 检查购物车是否为空
    if (cart.length === 0) {
        alert('购物车为空，请先添加商品');
        return;
    }
    
    // 获取用户地址
    let addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    let defaultAddress = addresses.find(address => address.isDefault) || addresses[0];
    
    if (!defaultAddress) {
        alert('请先添加收货地址');
        
        // 隐藏所有内容部分，显示地址管理页面
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById('address-book').classList.add('active');
        return;
    }
    
    // 创建新订单
    const newOrder = createNewOrder();
    
    // 将订单添加到模拟订单数据中
    mockOrders.unshift(newOrder);
    
    // 保存订单到本地存储
    localStorage.setItem('orders', JSON.stringify(mockOrders));
    
    // 为新订单创建物流数据
    createLogisticsData(newOrder);
    
    // 更新物流跟踪页面的订单选项
    updateLogisticsOrderOptions();
    
    // 清空购物车
    cart = [];
    saveCartToStorage();
    updateCartUI();
    
    // 显示成功提示
    showNotification('订单创建成功！即将跳转到订单页面');
    
    // 跳转到订单页面
    setTimeout(() => {
        // 隐藏所有内容部分
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // 显示订单页面
        document.getElementById('my-orders').classList.add('active');
        
        // 重新加载订单列表
        loadOrders('all');
    }, 2000);
}

/**
 * 创建新订单
 */
function createNewOrder() {
    const orderId = Date.now();
    const orderNumber = 'ORD' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // 准备订单商品数据
    const orderProducts = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
    }));
    
    return {
        id: orderId,
        orderNumber: orderNumber,
        status: 'pending',
        date: new Date().toISOString().slice(0, 10),
        totalAmount: totalAmount,
        products: orderProducts
    };
}

/**
 * 为订单创建物流数据
 */
function createLogisticsData(order) {
    // 物流公司列表
    const logisticsCompanies = [
        { name: '顺丰速运', prefix: 'SF' },
        { name: '圆通速递', prefix: 'YT' },
        { name: '中通快递', prefix: 'ZT' },
        { name: '韵达快递', prefix: 'YD' },
        { name: '京东物流', prefix: 'JD' }
    ];
    
    // 随机选择物流公司
    const selectedCompany = logisticsCompanies[Math.floor(Math.random() * logisticsCompanies.length)];
    
    // 生成物流单号
    const logisticsNumber = selectedCompany.prefix + Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
    
    // 生成物流步骤
    const now = new Date();
    const logisticsSteps = [
        {
            time: now.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
            status: '订单已创建，等待支付'
        }
    ];
    
    // 从本地存储获取物流数据，如果没有则使用模拟数据
    let logisticsData = JSON.parse(localStorage.getItem('logisticsData')) || mockLogisticsData;
    
    // 将物流数据添加到物流数据中
    logisticsData[order.id] = {
        orderNumber: order.orderNumber,
        logisticsNumber: logisticsNumber,
        company: selectedCompany.name,
        steps: logisticsSteps
    };
    
    // 保存物流数据到本地存储
    localStorage.setItem('logisticsData', JSON.stringify(logisticsData));
}

/**
 * 取消订单
 */
function cancelOrder(orderId) {
    if (confirm('确定要取消此订单吗？')) {
        const orderIndex = mockOrders.findIndex(o => o.id === orderId);
        if (orderIndex !== -1) {
            mockOrders[orderIndex].status = 'canceled';
            loadOrders(document.querySelector('.order-tabs .active').getAttribute('data-status') || 'all');
            showNotification('订单已取消');
        }
    }
}

/**
 * 确认收货
 */
function confirmDelivery(orderId) {
    if (confirm('确认已收到商品吗？')) {
        const orderIndex = mockOrders.findIndex(o => o.id === orderId);
        if (orderIndex !== -1) {
            mockOrders[orderIndex].status = 'completed';
            
            // 保存订单到本地存储
            localStorage.setItem('orders', JSON.stringify(mockOrders));
            
            // 更新物流状态为已签收
            updateLogisticsDataAfterDelivery(orderId);
            
            // 重新加载订单列表
            loadOrders(document.querySelector('.order-tabs .active').getAttribute('data-status') || 'all');
            
            // 更新物流跟踪页面的订单选项
            updateLogisticsOrderOptions();
            
            showNotification('已确认收货，感谢您的购买！');
        }
    }
}

/**
 * 收货地址功能实现
 */

// 获取DOM元素
const addressBookSection = document.getElementById('address-book');
const addressesContainer = document.getElementById('addresses-container');
const addAddressBtn = document.getElementById('add-address-btn');
const addressModal = document.getElementById('address-modal');
const cancelAddressBtn = document.getElementById('cancel-address');
const saveAddressBtn = document.getElementById('save-address');
const setDefaultAddressCheckbox = document.getElementById('set-default-address');

// 当前编辑的地址ID
let currentEditAddressId = null;

// 加载地址列表
function loadAddresses() {
    // 从本地存储获取地址
    let addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    
    // 如果没有地址，添加一个默认地址
    if (addresses.length === 0) {
        addresses = [{
            id: 1,
            name: '张三',
            phone: '13800138000',
            province: '北京市',
            city: '北京市',
            district: '朝阳区',
            address: '建国路88号现代城SOHO A座2305室',
            isDefault: true
        }];
        localStorage.setItem('addresses', JSON.stringify(addresses));
    }
    
    // 清空容器
    addressesContainer.innerHTML = '';
    
    // 显示地址
    addresses.forEach(address => {
        const addressElement = createAddressElement(address);
        addressesContainer.appendChild(addressElement);
    });
}

// 创建地址元素
function createAddressElement(address) {
    const div = document.createElement('div');
    div.className = 'address-item';
    
    div.innerHTML = `
        <div class="address-header">
            <div>
                <span class="address-name">${address.name}</span>
                <span class="address-phone">${address.phone}</span>
            </div>
            ${address.isDefault ? '<span class="default-badge">默认地址</span>' : ''}
        </div>
        <div class="address-detail">
            ${address.province}${address.city}${address.district}${address.address}
        </div>
        <div class="address-actions">
            <button class="address-action-btn address-action-btn-edit" data-id="${address.id}">编辑</button>
            <button class="address-action-btn address-action-btn-delete" data-id="${address.id}">删除</button>
        </div>
    `;
    // 添加编辑和删除事件
    div.querySelector('.address-action-btn-edit').addEventListener('click', () => editAddress(address.id));
    div.querySelector('.address-action-btn-delete').addEventListener('click', () => deleteAddress(address.id));
    
    return div;
}

// 创建通用的显示地址模态框函数
function showAddressModal() {
    // 显示地址模态框并添加active类以确保正确显示（处理透明度问题）
    addressModal.style.display = 'flex';
    addressModal.classList.add('active');
}

// 打开添加地址模态框
function openAddAddressModal() {
    currentEditAddressId = null;
    document.getElementById('recipient-name').value = '';
    document.getElementById('recipient-phone').value = '';
    document.getElementById('recipient-province').value = '';
    document.getElementById('recipient-city').value = '';
    document.getElementById('recipient-district').value = '';
    document.getElementById('recipient-address').value = '';
    setDefaultAddressCheckbox.checked = false;
    
    // 显示地址模态框
    showAddressModal();
}

// 编辑地址
function editAddress(id) {
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    const address = addresses.find(a => a.id === id);
    
    if (address) {
        currentEditAddressId = id;
        document.getElementById('recipient-name').value = address.name;
        document.getElementById('recipient-phone').value = address.phone;
        document.getElementById('recipient-province').value = address.province;
        document.getElementById('recipient-city').value = address.city;
        document.getElementById('recipient-district').value = address.district;
        document.getElementById('recipient-address').value = address.address;
        setDefaultAddressCheckbox.checked = address.isDefault;
        
        // 显示地址模态框
        showAddressModal();
    }
}

// 删除地址
function deleteAddress(id) {
    if (confirm('确定要删除这个地址吗？')) {
        let addresses = JSON.parse(localStorage.getItem('addresses')) || [];
        addresses = addresses.filter(address => address.id !== id);
        localStorage.setItem('addresses', JSON.stringify(addresses));
        loadAddresses();
        showNotification('地址已删除');
    }
}

// 保存地址
function saveAddress() {
    const name = document.getElementById('recipient-name').value;
    const phone = document.getElementById('recipient-phone').value;
    const province = document.getElementById('recipient-province').value;
    const city = document.getElementById('recipient-city').value;
    const district = document.getElementById('recipient-district').value;
    const address = document.getElementById('recipient-address').value;
    const isDefault = setDefaultAddressCheckbox.checked;
    
    // 简单验证
    if (!name || !phone || !province || !city || !district || !address) {
        alert('请填写完整的地址信息');
        return;
    }
    
    // 保存到本地存储
    let addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    
    if (currentEditAddressId) {
        // 更新现有地址
        const index = addresses.findIndex(a => a.id === currentEditAddressId);
        if (index !== -1) {
            addresses[index] = {
                ...addresses[index],
                name,
                phone,
                province,
                city,
                district,
                address,
                isDefault
            };
        }
    } else {
        // 添加新地址
        const newAddress = {
            id: Date.now(),
            name,
            phone,
            province,
            city,
            district,
            address,
            isDefault
        };
        addresses.push(newAddress);
    }
    
    // 如果设置为默认地址，取消其他地址的默认状态
    if (isDefault) {
        addresses = addresses.map(a => ({
            ...a,
            isDefault: a.id === (currentEditAddressId || addresses[addresses.length - 1].id)
        }));
    }
    
    localStorage.setItem('addresses', JSON.stringify(addresses));
    loadAddresses();
    
    // 安全地隐藏地址模态框
    addressModal.style.display = 'none';
    addressModal.classList.remove('active');
    
    showNotification(currentEditAddressId ? '地址已更新' : '地址已添加');
}

/**
 * 物流跟踪功能实现
 */

// 模拟物流数据
const mockLogisticsData = {
    1001: {
        orderNumber: 'ORD20230715001',
        logisticsNumber: 'SF1234567890',
        company: '顺丰速运',
        steps: [
            { time: '2023-07-17 09:30', status: '快递员[李四(13800138001)]正在为您派送，请保持电话畅通' },
            { time: '2023-07-16 18:45', status: '包裹已到达[北京朝阳区建国路营业点]，快递员将尽快为您派送' },
            { time: '2023-07-16 08:20', status: '包裹已到达[北京转运中心]，正在分拣中' },
            { time: '2023-07-15 16:30', status: '包裹已从[上海发货仓]发出' },
            { time: '2023-07-15 14:20', status: '商品已出库，正在安排发货' },
            { time: '2023-07-15 10:30', status: '订单已支付，商家正在备货' }
        ]
    },
    1002: {
        orderNumber: 'ORD20230710001',
        logisticsNumber: 'YT0987654321',
        company: '圆通速递',
        steps: [
            { time: '2023-07-14 15:20', status: '包裹已签收，感谢您的购买' },
            { time: '2023-07-14 10:15', status: '快递员[王五(13900139001)]正在为您派送，请保持电话畅通' },
            { time: '2023-07-13 19:30', status: '包裹已到达[北京朝阳区建国路营业点]' },
            { time: '2023-07-12 08:45', status: '包裹已到达[北京转运中心]，正在分拣中' },
            { time: '2023-07-11 16:20', status: '包裹已从[广州发货仓]发出' },
            { time: '2023-07-10 14:10', status: '订单已支付，商家正在备货' }
        ]
    }
};

// 初始化物流跟踪功能
function initLogisticsTracking() {
    const orderSelect = document.getElementById('order-select');
    const trackingInfo = document.getElementById('tracking-info');
    
    // 添加订单选项 - 从本地存储或模拟数据中获取订单
    updateLogisticsOrderOptions();
    
    // 添加订单选择事件
    orderSelect.addEventListener('change', () => {
        const orderId = parseInt(orderSelect.value);
        if (orderId) {
            showLogisticsInfo(orderId);
        } else {
            trackingInfo.innerHTML = '<div class="empty-cart">请选择要跟踪的订单</div>';
        }
    });
}

// 更新物流跟踪页面的订单选项
function updateLogisticsOrderOptions() {
    const orderSelect = document.getElementById('order-select');
    
    // 清空现有选项
    orderSelect.innerHTML = '<option value="">选择要跟踪的订单</option>';
    
    // 从本地存储获取订单数据，如果没有则使用模拟数据
    const orders = JSON.parse(localStorage.getItem('orders')) || mockOrders;
    
    // 添加订单选项
    orders.forEach(order => {
        const option = document.createElement('option');
        option.value = order.id;
        option.textContent = `订单号：${order.orderNumber} (${order.totalAmount.toFixed(2)})`;
        orderSelect.appendChild(option);
    });
}

// 显示物流信息
function showLogisticsInfo(orderId) {
    const trackingInfo = document.getElementById('tracking-info');
    
    // 从本地存储获取物流数据，如果没有则使用模拟数据
    const logisticsDataAll = JSON.parse(localStorage.getItem('logisticsData')) || mockLogisticsData;
    const logisticsData = logisticsDataAll[orderId];
    
    if (logisticsData) {
        // 生成物流步骤HTML
        let stepsHTML = '';
        logisticsData.steps.forEach((step, index) => {
            const isFirst = index === 0;
            stepsHTML += `
                <div class="tracking-step">
                    <div class="step-icon" style="background-color: ${isFirst ? '#ff7e5f' : '#ddd'}; color: ${isFirst ? 'white' : '#777'}">
                        ${isFirst ? '<i class="fas fa-shipping-fast"></i>' : '<i class="fas fa-check"></i>'}
                    </div>
                    <div class="step-content">
                        <div class="step-title">${step.status}</div>
                        <div class="step-date">${step.time}</div>
                    </div>
                </div>
            `;
        });
        
        trackingInfo.innerHTML = `
            <div class="logistics-header">
                <h3>物流信息</h3>
                <p>快递公司：${logisticsData.company}</p>
                <p>物流单号：${logisticsData.logisticsNumber}</p>
            </div>
            <div class="tracking-steps">
                ${stepsHTML}
            </div>
        `;
    } else {
        trackingInfo.innerHTML = '<div class="empty-cart">暂无物流信息</div>';
    }
}

/**
 * 帮助中心功能实现
 */

// 帮助中心FAQ数据
const faqData = {
    orders: [
        { question: '如何查询我的订单状态？', answer: '您可以在"我的订单"页面查看所有订单的状态。登录后，点击底部导航栏的"我的"，然后选择"我的订单"即可查看所有订单及其状态。' },
        { question: '如何取消订单？', answer: '对于待付款的订单，您可以直接在订单详情页面点击"取消订单"按钮。对于已付款的订单，您需要联系客服申请取消，我们的客服将在24小时内为您处理。' },
        { question: '订单可以修改吗？', answer: '订单提交后无法直接修改。如需要修改，请在付款前取消订单，然后重新下单。' }
    ],
    payment: [
        { question: '支持哪些支付方式？', answer: '我们支持微信支付、支付宝、银联等多种支付方式，您可以在结算页面选择最便捷的方式进行支付。' },
        { question: '支付失败怎么办？', answer: '如果支付失败，请检查您的网络连接和支付账户余额。如果问题仍然存在，请尝试重新支付或更换支付方式。' },
        { question: '如何申请退款？', answer: '您可以在订单详情页面点击"申请退款"按钮，选择退款原因并提交申请。我们的客服将在24小时内处理您的退款申请。' }
    ],
    delivery: [
        { question: '配送范围是什么？', answer: '我们支持全国大部分地区的配送服务。您可以在下单时输入收货地址，系统会自动判断是否支持配送。' },
        { question: '配送时间需要多久？', answer: '一般情况下，订单会在48小时内发货，具体送达时间取决于您所在的地区，通常为1-7个工作日。' },
        { question: '如何查询物流信息？', answer: '订单发货后，您可以在"我的订单"页面点击"查看物流"按钮，即可查看详细的物流信息。' }
    ],
    returns: [
        { question: '如何申请退货？', answer: '您可以在订单详情页面点击"申请退货"按钮，选择退货原因并提交申请。我们的客服将在24小时内联系您，指导您完成退货流程。' },
        { question: '退货需要满足什么条件？', answer: '商品需保持全新未使用状态，包装完整无损，且在收到商品后7天内申请退货。部分特殊商品可能有不同的退货政策，请以商品详情页的说明为准。' },
        { question: '退款什么时候到账？', answer: '我们收到退回的商品并检验合格后，将在3-7个工作日内为您办理退款，退款金额将原路返回您的支付账户。' }
    ]
};

// 初始化帮助中心
function initHelpCenter() {
    const helpCategories = document.querySelectorAll('.help-category');
    const faqContainer = document.getElementById('faq-container');
    
    // 初始加载订单问题
    loadFAQs('orders');
    
    // 添加分类切换事件
    helpCategories.forEach(category => {
        category.addEventListener('click', () => {
            const categoryType = category.getAttribute('data-category');
            
            // 更新激活状态
            helpCategories.forEach(c => c.classList.remove('active'));
            category.classList.add('active');
            
            // 加载对应分类的FAQ
            loadFAQs(categoryType);
        });
    });
}

// 加载FAQ列表
function loadFAQs(category) {
    const faqContainer = document.getElementById('faq-container');
    const faqs = faqData[category] || [];
    
    // 清空容器
    faqContainer.innerHTML = '';
    
    // 显示FAQ
    faqs.forEach(faq => {
        const faqElement = document.createElement('div');
        faqElement.className = 'faq-item';
        
        faqElement.innerHTML = `
            <div class="faq-question">
                <span>${faq.question}</span>
                <i class="fas fa-chevron-down faq-icon"></i>
            </div>
            <div class="faq-answer">
                ${faq.answer}
            </div>
        `;
        
        // 添加点击事件
        faqElement.querySelector('.faq-question').addEventListener('click', () => {
            faqElement.classList.toggle('active');
        });
        
        faqContainer.appendChild(faqElement);
    });
}

/**
 * 模拟物流状态自动更新
 */
function simulateLogisticsUpdates() {
    // 从本地存储加载物流数据
    let logisticsData = JSON.parse(localStorage.getItem('logisticsData')) || mockLogisticsData;
    const orders = JSON.parse(localStorage.getItem('orders')) || mockOrders;
    const now = new Date();
    let hasUpdates = false;
    
    // 遍历所有订单，检查是否需要更新物流状态
    orders.forEach(order => {
        if (order.status === 'delivering' && logisticsData[order.id]) {
            const logistics = logisticsData[order.id];
            const lastStep = logistics.steps[0]; // 最新步骤在前面
            
            // 根据当前物流状态决定是否添加新的物流步骤
            if (lastStep.status === '商品已出库，正在安排发货' && Math.random() > 0.7) {
                // 添加运输中状态
                const newStep = {
                    time: now.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
                    status: '包裹已发出，正在运输中'
                };
                logistics.steps.unshift(newStep);
                hasUpdates = true;
            } else if (lastStep.status === '包裹已发出，正在运输中' && Math.random() > 0.8) {
                // 添加派送中状态
                const newStep = {
                    time: now.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
                    status: '包裹已到达当地，正在派送中'
                };
                logistics.steps.unshift(newStep);
                hasUpdates = true;
            }
        }
    });
    
    // 如果有更新，保存数据
    if (hasUpdates) {
        localStorage.setItem('logisticsData', JSON.stringify(logisticsData));
        
        // 刷新当前显示的订单列表
        const activeTab = document.querySelector('.order-tabs .active');
        if (activeTab) {
            const status = activeTab.getAttribute('data-status') || 'all';
            loadOrders(status);
        }
        
        // 如果当前在物流跟踪页面，更新显示
        if (document.getElementById('logistics-tracking').classList.contains('active')) {
            const orderSelect = document.getElementById('order-select');
            const selectedOrderId = parseInt(orderSelect.value);
            if (selectedOrderId && logisticsData[selectedOrderId]) {
                showLogisticsInfo(selectedOrderId);
            }
        }
    }
}

/**
 * 初始化所有功能
 */
function initAllFeatures() {
    // 我的订单
    showMyOrders();
    
    // 收货地址
    loadAddresses();
    addAddressBtn.addEventListener('click', openAddAddressModal);
    cancelAddressBtn.addEventListener('click', () => {
        addressModal.style.display = 'none';
        // 移除active类以确保下次正确显示
        addressModal.classList.remove('active');
    });
    saveAddressBtn.addEventListener('click', saveAddress);
    
    // 添加点击模态框背景关闭地址模态框的功能
    addressModal.addEventListener('click', (e) => {
        if (e.target === addressModal) {
            addressModal.style.display = 'none';
            addressModal.classList.remove('active');
        }
    });
    
    // 物流跟踪
    initLogisticsTracking();
    
    // 帮助中心
    initHelpCenter();
    
    // 为个人资料菜单添加事件监听
    document.querySelectorAll('.profile-menu .menu-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            // 隐藏所有内容部分
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // 根据点击的菜单项显示对应的页面
            const targetSections = ['my-orders', 'address-book', 'logistics-tracking', 'help-center', 'settings'];
            document.getElementById(targetSections[index]).classList.add('active');
            
            // 更新底部导航栏的激活状态
            navTabs.forEach(tab => {
                tab.classList.remove('active');
            });
            
            // 根据不同的菜单项激活对应的底部导航标签
            switch(targetSections[index]) {
                case 'my-orders':
                case 'address-book':
                case 'logistics-tracking':
                case 'help-center':
                case 'settings':
                    // 这些页面都属于"我的"部分，激活"我的"标签
                    document.querySelector('[data-target="profile"]').classList.add('active');
                    break;
            }
            
            // 如果是物流跟踪页面，更新选项
            if (targetSections[index] === 'logistics-tracking') {
                updateLogisticsOrderOptions();
            }
        });
    });
    
    // 启动物流状态自动更新（每分钟更新一次）
    setInterval(simulateLogisticsUpdates, 60000);
}

// 初始化应用
init();

// 页面加载完成后初始化所有功能
initAllFeatures();