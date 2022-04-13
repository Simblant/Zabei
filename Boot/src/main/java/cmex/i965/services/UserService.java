package cmex.i965.services;

import cmex.i965.models.Role;
import cmex.i965.models.User;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserService {

    List<User> index();

    User show(int id);

    void save(User user);

    void update(User user);

    void delete(int id);

    UserDetails loadUserByUsername(String username);

    User findByName(String name);

    List<Role> getRoles();
}
